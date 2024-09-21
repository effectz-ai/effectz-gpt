import 'dotenv/config'
import { Request } from "express"




const whatsappAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID!

interface WebhookPayload {
    object: string;
    entry: Array<{
      id: string;
      changes: Array<{
        value: {
          messaging_product: string;
          metadata: {
            display_phone_number: string;
            phone_number_id: string;
          };
          contacts: Array<{
            profile: {
              name: string;
            };
            wa_id: string;
          }>;
          messages: Array<{
            from: string;
            id: string;
            timestamp: string;
            text: {
              body: string;
            };
            type: string;
          }>;
        };
        field: string;
      }>;
    }>;
  }
  
  export function extractMessageDetails(request:Request):{ from: string; messageText: string } | null {
    try {
        const payload: WebhookPayload = request.body;
    
        // Check if the 'id' exists first
        if (payload.entry[0]?.id !== whatsappAccountId) {
          console.error('ID is missing in the payload');
          return null;
        }
    
        // Proceed with extracting 'from' and 'messageText'
        const messageEntry = payload.entry[0].changes[0].value;
        const from = messageEntry.messages[0]?.from;
        const messageText = messageEntry.messages[0]?.text?.body;
    
        // Ensure that both 'from' and 'messageText' exist before returning
        if (from && messageText) {
          return { from, messageText };
        } else {
          console.error('Missing "from" or "messageText" in the payload');
          return null;
        }
      } catch (error) {
        console.error('Error extracting message details:', error);
        return null;
      }
  }

