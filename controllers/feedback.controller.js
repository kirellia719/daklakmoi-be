const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { author, content } = req.body;
    const feedback = new Feedback({ author, content });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  const data = await Feedback.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const feedback = await Feedback.findByIdAndUpdate(id, { status: true }, { new: true });
  if (!feedback) return res.status(404).json({ error: 'Not found' });
  res.json(feedback);
};
