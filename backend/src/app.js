const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactRouter = require('./routes/contact');
const quoteRouter = require('./routes/quote');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many enquiries submitted. Please try again later.' },
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/v1/contact', contactLimiter, contactRouter);
app.use('/api/v1/quote', contactLimiter, quoteRouter);

app.use(errorHandler);

module.exports = app;
