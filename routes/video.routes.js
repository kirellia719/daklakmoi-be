const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// ✅ POST /api/videos - thêm video mới
router.post('/', async (req, res) => {
  try {
    const { embedLink } = req.body;

    if (
      !/^https:\/\/www\.youtube\.com\/embed\/[\w-]{11}$/.test(embedLink)
    ) {
      return res.status(400).json({ error: 'Link nhúng không hợp lệ' });
    }

    // kiểm tra trùng lặp
    const exists = await Video.findOne({ embedLink });
    if (exists) {
      return res.status(409).json({ error: 'Video đã tồn tại' });
    }

    const video = new Video({ embedLink });
    await video.save();
    res.status(201).json({ message: 'Video đã được lưu', video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// ✅ GET /api/videos - lấy danh sách video
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Không thể lấy dữ liệu' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Video không tồn tại' });
    }
    res.json({ message: 'Đã xóa video', id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server khi xóa' });
  }
});

module.exports = router;
