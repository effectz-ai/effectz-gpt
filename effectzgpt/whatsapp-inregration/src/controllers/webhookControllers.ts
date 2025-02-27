import { Request, Response } from 'express';

export async function verifyWebhook(req:Request, res:Response){
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  try {
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function handleWebhook(req:Request, res:Response){
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}