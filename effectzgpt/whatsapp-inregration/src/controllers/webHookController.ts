import 'dotenv/config'
import { Request, Response } from 'express';
import {extractMessageDetails} from "../services/extractMsg";
import {getEffectzResponse} from "../services/getEffectzRes";
import axios from "axios";

const webHookVerifyToken  = process.env.WEBHOOK_VERIFY_TOKEN!

export const verifyWebhook = (req:Request,res:Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token == webHookVerifyToken){
        // respond with 200 OK and challenge token from the request
        res.status(200).send(challenge)
    } else {
        // respond with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403)
    }
}

export const handleWebhookEvent = async (req: Request, res: Response) => {
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

    const msgDetails = extractMessageDetails(req);
    if (msgDetails) {
        const effectzResponse = await getEffectzResponse(msgDetails?.messageText!)
        try {
            const url = `https://graph.facebook.com/${process.env.CLOUD_API_VERSION!}/${process.env.WHATSAPP_PHONE_NUMBER_ID!}/messages`;
            console.info(url)

            await axios.post(
                url,
                {
                    messaging_product: 'whatsapp',
                    to: msgDetails?.from, // Reply to the same phone number that sent the message
                    text: {body: effectzResponse},
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN!}`,
                        "Content-Type": 'application/json'
                    },
                }
            )

            //Mark message as read
            await axios.post(
                url,
                {
                    messaging_product: "whatsapp",
                    status: "read",
                    message_id: msgDetails.messageId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN!}`,
                        "Content-Type": 'application/json'
                    },
                }
            );
            res.sendStatus(200)
        } catch (e) {
            console.error(e)
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(200)
    }
}

