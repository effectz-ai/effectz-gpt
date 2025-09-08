import {Router} from 'express'
import { handleWebhook, verifyWebhook } from '../controllers/webhookControllers';

const webHookRouter = Router();

webHookRouter.get('/', verifyWebhook);
webHookRouter.post('/', handleWebhook)

export default webHookRouter;