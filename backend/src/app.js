const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactRouter = require('./routes/contact');
const quoteRouter = require('./routes/quote');
const careersRouter = require('./routes/careers');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Behind Vercel/any reverse proxy every request arrives from the proxy's IP.
// Without this the rate limiters share ONE counter across all visitors, so
// after 5 quote submissions (site-wide) per 10 min everyone gets blocked.
app.set('trust proxy', 1);

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);

app.use(cors({
  // Listed origins, plus any localhost/127.0.0.1 port outside production
  // (Vite moves to 5175, 5176… when 5173 is busy, which used to fail CORS).
  origin: (origin, cb) => {
    if (!origin || !allowedOrigins.length || allowedOrigins.includes(origin)) return cb(null, true);
    const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    return cb(null, isLocal && process.env.NODE_ENV !== 'production');
  },
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
app.use('/api/v1/careers', contactLimiter, careersRouter);

app.use(errorHandler);

module.exports = app;
