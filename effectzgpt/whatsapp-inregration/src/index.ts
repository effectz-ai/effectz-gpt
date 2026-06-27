// Load environment variables first with explicit path
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env file from the project root
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

import express from 'express'
import morgan from 'morgan'
import webHookRouter from './routes/webhookRoutes'
import bodyParser from 'body-parser'
import { config } from './config'

const app = express()
const port = config.PORT

app.use(bodyParser.json())
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.send('Hello from EffectzGPT Whatsapp Webhook')
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.NODE_ENV,
        port: config.PORT
    })
})

app.use('/webhook', webHookRouter)

app.listen(port, () => {
  console.log(`Effectz Whatsapp is listening at http://localhost:${port}`)
})