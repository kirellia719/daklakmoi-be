const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    embedLink: {
      type: String,
      required: true,
      unique: true, // tránh trùng video
    },
  },
  {
    timestamps: true, // tạo createdAt, updatedAt
  }
);

module.exports = mongoose.model('Video', videoSchema);
