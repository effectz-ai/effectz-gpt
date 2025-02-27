"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhookControllers_1 = require("../controllers/webhookControllers");
const webHookRouter = (0, express_1.Router)();
webHookRouter.get('/', webhookControllers_1.verifyWebhook);
webHookRouter.post('/', webhookControllers_1.handleWebhook);
exports.default = webHookRouter;
