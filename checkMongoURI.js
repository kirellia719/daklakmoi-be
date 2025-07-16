const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('✅ SUCCESS: MongoDB URI is valid and connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ ERROR: Failed to connect to MongoDB.');
    console.error('Message:', err.message);
    process.exit(1);
  });
