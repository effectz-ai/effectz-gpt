"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappClient = void 0;
require("dotenv/config");
const whatsapp_api_js_1 = require("whatsapp-api-js");
const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;
exports.WhatsappClient = new whatsapp_api_js_1.WhatsAppAPI({
    token: TOKEN,
    appSecret: APP_SECRET
});
