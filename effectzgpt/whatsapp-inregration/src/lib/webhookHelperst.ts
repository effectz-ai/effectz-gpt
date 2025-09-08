import { Request } from 'express';
import { WebhookPayload } from '../types/types';
import 'dotenv/config'

const whatsappAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

export function extractMsgDetails(req: Request):{ from: string; messageText: string ,messageId : string, timeStamp:string}|void {
    try {
        const payload: WebhookPayload = req.body;
        console.log(payload.entry[0].id)
        // Check if the 'id' exists first
        if (payload?.entry?.[0]?.id !== whatsappAccountId) {
            console.error('ID is missing in the payload');
          }
      
          // Proceed with extracting 'from' and 'messageText'
          const messageEntry = payload.entry?.[0]?.changes[0]?.value?.messages?.[0];
          console.log(messageEntry)
          const from = messageEntry?.from;
          const timeStamp = messageEntry?.timestamp;
          const messageText = messageEntry?.text?.body;
          const messageType = messageEntry?.type;
          const messageId = messageEntry?.id;

          const currentTime = Math.floor(Date.now() / 1000);
          const messageTime = parseInt(timeStamp);
          const isRecentMessage = (currentTime - messageTime) <= 60;
          
          console.log(`From: ${from}, Message: ${messageText}, Type: ${messageType}, Message ID: ${messageId}`);
          // Ensure that both 'from' and 'messageText' exist before returning
          if ( from &&  messageText && isRecentMessage) {
              return {from, messageText, messageId, timeStamp};
          } else {
            if (!isRecentMessage) {
                console.log('Message is older than 1 minute, ignoring');
              } else {
                console.error('Either "from" or "messageText" is missing in the payload or message type is not text');
              }
          }
    } catch (error) {
        console.error(error);
        throw new Error('Error extracting message details from the payload');
    }
}

// export async function handleMessage()