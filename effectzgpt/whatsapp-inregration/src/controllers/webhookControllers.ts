import { Request, Response } from 'express';
import { extractMsgDetails } from '../lib/webhookHelperst';
import { WhatsappService } from '../services/whatsapp';
import { MenuService } from '../services/menu';
import { AIChatService } from '../services/aiChat';
import { config } from '../config';

const menuService = new MenuService();
const aiChatService = new AIChatService();
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
    
    // Check for greeting messages
    if(GREETINGS.includes(messageText.toLowerCase())){
      // Exit chat mode if user sends greeting
      if (menuService.isInChatMode(from)) {
        menuService.exitChatMode(from);
      }
      
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

    // Check if user is in chat mode
    if (menuService.isInChatMode(from)) {
      const chatResponse = menuService.handleChatMessage(from, messageText);
      
      if (chatResponse.action === 'exit_chat') {
        // User wants to exit chat
        const whatsappRes = await WhatsApp.sendText(from, chatResponse.text!);
        console.log("✅ Chat exited, menu displayed");
        
        if (whatsappRes.status === 200) {
          res.sendStatus(200);
        } else {
          console.error("❌ Failed to send WhatsApp message, status:", whatsappRes.status);
          res.sendStatus(404);
        }
        return;
      } else if (chatResponse.action === 'continue_chat' && chatResponse.aiMessage) {
        // Send message to AI and get response
        try {
          // Send typing indicator to show AI is processing
          await WhatsApp.sendText(from, "🤖 Thinking...");
          
          const chatState = menuService.getChatState(from);
          const aiResponse = await aiChatService.sendMessage({
            message: chatResponse.aiMessage,
            userId: from,
            conversationId: chatState?.conversationId
          });

          // Update conversation ID if provided
          if (aiResponse.conversationId) {
            menuService.enterChatMode(from, aiResponse.conversationId);
          }

          const whatsappRes = await WhatsApp.sendText(from, aiResponse.response);
          console.log("✅ AI response sent");
          
          if (whatsappRes.status === 200) {
            res.sendStatus(200);
          } else {
            console.error("❌ Failed to send WhatsApp message, status:", whatsappRes.status);
            res.sendStatus(404);
          }
          return;
        } catch (error) {
          console.error("❌ Error processing AI chat:", error);
          const errorMessage = "Sorry, I encountered an error. Type 'exit' to return to the main menu or try your message again.";
          await WhatsApp.sendText(from, errorMessage);
          res.sendStatus(200);
          return;
        }
      }
    }

    // Handle regular menu navigation
    const menuResponse = menuService.handleInput(from, messageText);
    let whatsappRes;
    
    if (menuResponse.action === 'start_chat') {
      // User selected to start chat with AI
      whatsappRes = await WhatsApp.sendText(from, menuResponse.text);
      console.log("✅ Chat mode started");
    } else if (menuResponse.template) {
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