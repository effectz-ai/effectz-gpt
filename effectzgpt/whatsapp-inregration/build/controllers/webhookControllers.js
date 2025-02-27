"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhook = verifyWebhook;
exports.handleWebhook = handleWebhook;
function verifyWebhook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        try {
            if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
                res.status(200).send(challenge);
            }
            else {
                res.sendStatus(403);
            }
        }
        catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    });
}
function handleWebhook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.sendStatus(200);
        }
        catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    });
}
