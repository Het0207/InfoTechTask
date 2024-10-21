// models/QuizResult.js
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true }, 
    difficulty: { type: String, required: true },
    tags: { type: [String], required: false }, 
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
