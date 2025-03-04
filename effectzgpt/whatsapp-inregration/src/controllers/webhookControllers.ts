import { Request, Response } from 'express';
import { extractMsgDetails } from '../lib/webhookHelperst';
import { WhatsappService } from '../services/whatsapp';
import 'dotenv/config';
import { MenuService } from '../services/menu';

const menuService = new MenuService();
const GREETINGS = ['hi', 'hello', 'hey', 'start', 'menu', 'help'];

export async function verifyWebhook(req:Request, res:Response){
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  try {
    if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function handleWebhook(req:Request, res:Response){
  const result = await extractMsgDetails(req);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  const { from, messageText, messageId } = result;
  const WhatsApp = new WhatsappService({
    apiVersion: process.env.CLOUD_API_VERSION!,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
    botPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!
  });
  try {
    // Extract message details from the payload
    console.log(`Received a message from ${from}: ${messageText}`);

    await WhatsApp.markAsRead(messageId);
    if(GREETINGS.includes(messageText.toLowerCase())){
      const response = await WhatsApp.sendTemplate(from, 'hello', 'en_US',{
        type:'header',
        parameters:[{
          type:'image',
          image:{link: 'https://www.kingshospital.lk/public/frontend/images/logo.png'}
        }]
      })
      console.log("Greeting message sent")
      res.sendStatus(200);
      return;
    }

    const menuResponse = menuService.handleInput(from, messageText);
    let whatsappRes
    if (menuResponse.template){
      whatsappRes = await WhatsApp.sendTemplate(
        from,
        menuResponse.template?.name!,
        menuResponse.template?.language,
        menuResponse.template?.headerParam,
      )
      console.log("Menu message sent", menuResponse.template?.name)
    } else {
      whatsappRes = await WhatsApp.sendText(from, menuResponse.text);
      console.log("Text message sent")
    }
    
    if (whatsappRes.status === 200) {
      res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }

  } catch (error) {
    res.sendStatus(500);
    WhatsApp.markAsRead(messageId);
    console.error(error);
  }
}