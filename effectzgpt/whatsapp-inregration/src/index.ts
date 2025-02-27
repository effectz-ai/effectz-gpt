import express from 'express'
import morgan from 'morgan'

import 'dotenv/config'
import webHookRouter from './routes/webhookRoutes'

const app = express()
const port = process.env.PORT || 3000

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/webhook', webHookRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})