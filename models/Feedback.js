const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
