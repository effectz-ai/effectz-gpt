const express = require('express');
import webhookRoutes from './routes/webhookRoutes';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Routes
app.use(webhookRoutes);

export default app;