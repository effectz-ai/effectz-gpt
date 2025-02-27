"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const webhookRoutes_1 = __importDefault(require("./routes/webhookRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/webhook', webhookRoutes_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
