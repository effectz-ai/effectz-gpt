import express from 'express';
import webhookRoutes from './routes/webHookRoutes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Routes
app.use(webhookRoutes);

export default app;