import 'dotenv/config';

import {WhatsAppAPI} from 'whatsapp-api-js'

const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;

export const WhatsappClient = new WhatsAppAPI({
    token: TOKEN!,
    appSecret:APP_SECRET!
})



