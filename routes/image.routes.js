const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
// Tạo thư mục lưu ảnh nếu chưa tồn tại
const uploadPath = path.join(__dirname, '..', 'uploads', 'images');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ GET /api/images – Trả về danh sách đường dẫn ảnh
router.get('/', (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'Không đọc được thư mục ảnh' });

    const urls = files.map((file) => `/uploads/images/${file}`);
    res.json(urls);
  });
});

// ✅ POST /api/images – Upload nhiều ảnh
router.post('/', upload.array('images', 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Chưa chọn ảnh nào' });
  }

  const urls = req.files.map((file) => `/uploads/images/${file.filename}`);
  res.status(201).json({ message: 'Đã upload thành công', urls });
});

router.delete('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(uploadPath, filename);

  fs.unlink(filepath, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Không tìm thấy ảnh để xoá' });
    }

    res.json({ message: 'Ảnh đã được xoá' });
  });
});

module.exports = router;
