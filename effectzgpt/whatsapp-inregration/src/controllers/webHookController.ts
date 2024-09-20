import 'dotenv/config'
import { Request, Response } from 'express';
import {extractMessageDetails} from "../../extractMsg";
import {getEffectzResponse} from "../services/getEffectzRes";
import axios from "axios";

const webHookVerifyToken  = process.env.WEBHOOK_VERIFY_TOKEN!

export const verifyWebhook = (req:Request,res:Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token == webHookVerifyToken){
        res.status(200).send(challenge)
    } else {
        res.sendStatus(403)
    }
}

export const handleWebhookEvent = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const msgDetails = extractMessageDetails(req);
    if (!msgDetails?.messageText || !msgDetails?.from) {
        return res.sendStatus(400);
    }

    const effectzResponse = await getEffectzResponse(msgDetails?.messageText!)
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID!}/messages`,
            {
                messaging_product: 'whatsapp',
                to: msgDetails?.from, // Reply to the same phone number that sent the message
                text: { body: effectzResponse},
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN!}`,
                    "Content-Type": 'application/json'
                },
            }
        )
        res.sendStatus(200)
    }catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

