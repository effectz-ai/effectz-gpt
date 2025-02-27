import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import 'dotenv/config'
import webHookRouter from './routes/webhookRoutes'

const corsOptions = {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true
}
const app = express()
const port = process.env.PORT || 3000

app.use(cors(corsOptions))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.send('Hello from EffectzGPT Whatsapp Webhook')
})
app.use('/webhook', webHookRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})