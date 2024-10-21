const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

router.post("/quiz", quizController.generateQuiz);

router.post("/submitQuiz", quizController.submitQuiz);

module.exports = router;
