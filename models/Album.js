const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // đường dẫn ảnh hoặc URL
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Album', albumSchema);
