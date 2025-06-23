import express from 'express'
import morgan from 'morgan'

import 'dotenv/config'
import webHookRouter from './routes/webhookRoutes'
import bodyParser from 'body-parser'


const app = express()
const port = process.env.PORT || 8080

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
        environment: process.env.NODE_ENV || 'development'
    })
})

app.use('/webhook', webHookRouter)

app.listen(port, () => {
  console.log(`Effectz Whatsapp is listening at http://localhost:${port}`)
})