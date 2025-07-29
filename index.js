require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require("cors")
const morgan = require('morgan');

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8080;

// Kết nối MongoDB
connectDB();

app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // ⚠️ Cho phép tải ảnh từ origin khác
  })
);
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
// 2. Giới hạn 100 request mỗi IP trong 15 phút
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100,                 // Giới hạn mỗi IP
  message: '⚠️ Too many requests from this IP, please try again later.'
});
app.use(limiter);
app.use(express.json());

app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // hoặc localhost:5173
  next();
});
app.use('/uploads', express.static('uploads'));
// Routes
app.use('/images', require('./routes/image.routes'));
app.use('/videos', require('./routes/video.routes'));
app.use("/", require("./voiceAPI"))

// app.use('/', async (req, res) => {
//   res.json("Hello server");
// });

// Middleware lỗi (tùy chọn)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
