import 'dotenv/config';

import {WhatsAppAPI} from 'whatsapp-api-js'
import { Text } from 'whatsapp-api-js/messages';

const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export const WhatsappClient = new WhatsAppAPI({
    token: TOKEN!,
    appSecret:APP_SECRET!
})

export class WhatsappService {
    async sendText(to:string, text:string){
        if(PHONE_ID === undefined){
            throw new Error('Phone number ID is not defined');
        }
        try {
            const textMsg = new Text(text)
            return await WhatsappClient.sendMessage(PHONE_ID,to, textMsg)
        } catch (error) {
            console.error(error)
            throw new Error('Failed to send message')
        }
    }
}

