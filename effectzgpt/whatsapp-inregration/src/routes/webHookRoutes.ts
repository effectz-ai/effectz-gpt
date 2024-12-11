import { Router } from "express";
import { handleWebhookEvent, verifyWebhook } from "../controllers/webHookController";
import {handleFlow, verifyFlow} from "../controllers/flowController";


const router = Router();

router.get('/webhook',verifyWebhook);
router.post('/webhook',handleWebhookEvent);
router.get('/flow',verifyFlow)
router.post('/flow',handleFlow)

export default router