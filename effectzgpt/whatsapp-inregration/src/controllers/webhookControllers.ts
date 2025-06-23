import { Request, Response } from 'express';
import { extractMsgDetails } from '../lib/webhookHelperst';
import { WhatsappService } from '../services/whatsapp';
import { MenuService } from '../services/menu';
import { config } from '../config';

const menuService = new MenuService();
const GREETINGS = ['hi', 'hello', 'hey', 'start', 'menu', 'help'];

export async function verifyWebhook(req:Request, res:Response){
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  try {
    if (mode === 'subscribe' && token === config.WEBHOOK_VERIFY_TOKEN) {
      console.log('✅ Webhook verification successful');
      res.status(200).send(challenge);
    } else {
      console.log('❌ Webhook verification failed - invalid token or mode');
      res.sendStatus(403);
    }
  } catch (error) {
    console.error('❌ Webhook verification error:', error);
    res.sendStatus(500);
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
    apiVersion: config.CLOUD_API_VERSION,
    accessToken: config.WHATSAPP_ACCESS_TOKEN,
    botPhoneNumberId: config.WHATSAPP_PHONE_NUMBER_ID
  });
  try {
    // Extract message details from the payload
    console.log(`📱 Received a message from ${from}: ${messageText}`);

    await WhatsApp.markAsRead(messageId);
    if(GREETINGS.includes(messageText.toLowerCase())){
      const response = await WhatsApp.sendTemplate(from, 'hello', 'en_US',{
        type:'header',
        parameters:[{
          type:'image',
          image:{link: 'https://www.kingshospital.lk/public/frontend/images/logo.png'}
        }]
      })
      console.log("✅ Greeting message sent")
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
      console.log("✅ Menu message sent:", menuResponse.template?.name)
    } else {
      whatsappRes = await WhatsApp.sendText(from, menuResponse.text);
      console.log("✅ Text message sent")
    }
    
    if (whatsappRes.status === 200) {
      res.sendStatus(200);
    } else {
        console.error("❌ Failed to send WhatsApp message, status:", whatsappRes.status);
        res.sendStatus(404);
    }

  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    res.sendStatus(500);
    try {
      await WhatsApp.markAsRead(messageId);
    } catch (markReadError) {
      console.error("❌ Error marking message as read:", markReadError);
    }
  }
}