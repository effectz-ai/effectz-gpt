import { Router } from "express";
import { handleWebhookEvent, verifyWebhook } from "../controllers/webHookController";

const router = Router();

router.get('/webhook',verifyWebhook);
router.post('/webhook',handleWebhookEvent);

export default router