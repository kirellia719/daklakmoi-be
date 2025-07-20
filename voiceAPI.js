require('dotenv').config();

const express = require('express');
const router = express.Router();

const VIETTEL_API_URL = "https://viettelai.vn/tts/speech_synthesis";
const TOKEN = process.env.TTS_VIETTEL_TOKEN; // 🔐 Đặt token ở đây


router.post("/api/tts", async (req, res) => {
  const { text, voice = "hcm-quynhanh", speed = 1 } = req.body;

  try {
    const response = await fetch(VIETTEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*"
      },
      body: JSON.stringify({
        text,
        voice,
        speed,
        tts_return_option: 3,
        token: TOKEN,
        without_filter: false
      })
    });

    if (!response.ok) {
      return res.status(response.status).send("Lỗi Viettel TTS");
    }

    // ✅ Dùng arrayBuffer thay vì buffer()
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "inline; filename=tts.mp3"
    });
    res.send(buffer);

  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;