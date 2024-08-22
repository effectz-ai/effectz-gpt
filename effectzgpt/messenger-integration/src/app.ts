import express from 'express';
import bodyParser from 'body-parser';
import webhookRoutes from './routes/webhookRoutes';

const app = express();
app.use(bodyParser.json());

// Routes
app.use(webhookRoutes);

export default app;