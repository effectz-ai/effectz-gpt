import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { webHookHandler } from './webHookHandler';

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', webHookHandler)
app.post('/',webHookHandler)

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
})
