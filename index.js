require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
