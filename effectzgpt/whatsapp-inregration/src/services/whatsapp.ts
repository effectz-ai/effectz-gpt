import {WhatsAppAPI} from 'whatsapp-api-js'

const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const WHATSAPP_APP_SECRET = process.env.WHATSAPP_APP_SECRET
const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN

if(!TOKEN || !WHATSAPP_APP_SECRET || !WEBHOOK_VERIFY_TOKEN){
    throw new Error("Missing environment variables")
}

const Whatsapp = new WhatsAppAPI(
    {
        token: TOKEN,
        appSecret: WHATSAPP_APP_SECRET,
        webhookVerifyToken: WEBHOOK_VERIFY_TOKEN
    }
)

export default Whatsapp