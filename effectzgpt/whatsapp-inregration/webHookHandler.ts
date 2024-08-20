import 'dotenv/config'

import { Request,Response } from 'express'
import { getEffectzResponse } from './effectzGpt';
import { extractMessageDetails} from './extractMsg';
import axios from 'axios';

const webHookVerifyToken  = process.env.WEBHOOK_VERIFY_TOKEN!

export const webHookHandler = async (request:Request, response:Response) => {
    try {
        if (request.method === 'GET') {
            const mode = request.query['hub.mode'];
            const token = request.query['hub.verify_token'];
            const challenge = request.query['hub.challenge'];

            if (mode === 'subscribe' && token == webHookVerifyToken){
                response.status(200).send(challenge)
            } else {
                response.sendStatus(403)
            }
        }
        if (request.method === 'POST') {
            if (!request.body) {
                return response.sendStatus(400);
            }

            const msgDetails = extractMessageDetails(request);
            if (!msgDetails?.messageText || !msgDetails?.from) {
                return response.sendStatus(400);
            }
            const effectzRespone = await getEffectzResponse(msgDetails?.messageText!)
            await axios.post(
                `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID!}/messages`,
                {
                    messaging_product: 'whatsapp',
                    to: msgDetails?.from, // Reply to the same phone number that sent the message
                    text: { body: effectzRespone?.data.result.content},
                },
                {
                    headers: {
                      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN!}`,
                      "Content-Type": 'application/json'
                    },
                  }
            )
            response.sendStatus(200)
        } else{
            return response.sendStatus(405);
        }

    } catch (error) {
        console.error(error)
        response.sendStatus(500)
    }
}