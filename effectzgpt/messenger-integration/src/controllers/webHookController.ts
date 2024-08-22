import { Request, Response } from 'express';
import 'dotenv/config'
import { sendMessage } from '../services/messengerService';
import { getEffectzResponse } from '../services/effectzGpt';

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN!;

export const verifyWebhook = (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(403).send('Forbidden');
  }
};

export const handleWebhookEvent = async (req: Request, res: Response) => {
  const body = req.body;

  if (body.object === 'page') {
    for (const entry of body.entry) {
      const event = entry.messaging[0];
      const senderId = event.sender.id;
      const messageText = event.message?.text;

      if (messageText) {
        const aiResponse = await getEffectzResponse(messageText);
        await sendMessage(senderId, aiResponse);
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};