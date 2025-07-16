require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8080;

// Kết nối MongoDB
connectDB();

app.use(helmet());
app.use(express.json());

// Routes
app.use('/feedback', require('./routes/feedback.routes'));

// Middleware lỗi (tùy chọn)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
