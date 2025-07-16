const express = require('express');
const router = express.Router();
const feedbackCtrl = require('../controllers/feedback.controller');

router.post('/', feedbackCtrl.createFeedback);
router.get('/', feedbackCtrl.getFeedbacks);
router.put('/:id/status', feedbackCtrl.updateStatus);

module.exports = router;
