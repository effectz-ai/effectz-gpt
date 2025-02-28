import express from 'express'
import morgan from 'morgan'

import 'dotenv/config'
import webHookRouter from './routes/webhookRoutes'
import bodyParser from 'body-parser'


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.send('Hello from EffectzGPT Whatsapp Webhook')
})
app.use('/webhook', webHookRouter)

app.listen(port, () => {
  console.log(`Effectz Whatsapp is listening at http://localhost:${port}`)
})