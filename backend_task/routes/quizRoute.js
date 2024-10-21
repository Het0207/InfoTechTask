const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

router.post("/quiz", quizController.generateQuiz);

router.post("/submitQuiz", quizController.submitQuiz);

router.get("/history", quizController.getQuizHistory);

module.exports = router;
