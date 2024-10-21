const jwt_config = require('../config/jwtConfig');
const axios = require('axios');
const api_key = jwt_config.key;
const QuizResult = require('../models/quizModels'); 

module.exports.generateQuiz = async (req, res) => {
    const { category, difficulty, tags, limit } = req.body;
    try {
        const response = await axios.get('https://quizapi.io/api/v1/questions', {
            params: {
                apiKey: api_key,
                limit: limit,
                category: category,
                difficulty: difficulty,
                tags: tags,
            }
        });
        const questions = response.data;

        res.status(200).json({
            message: 'Quiz generated successfully',
            quiz: questions
        });
    } catch (error) {
        console.error("Error during API request:", error.message);
        res.status(500).json({
            message: 'Error fetching quiz data from API',
            error: error.message
        });
    }
};

module.exports.submitQuiz = async (req, res) => {
    const { userAnswers, quiz } = req.body; 

    if (!userAnswers || !quiz) {
        return res.status(400).json({ message: 'User answers and quiz data is required.' });
    }

    let score = 0;
    const totalQuestions = quiz.length;

    quiz.forEach((question, index) => {
        const correctAnswer = Object.keys(question.correct_answers).find(
            key => question.correct_answers[key] === 'true'
        );

        var userAnswer = userAnswers[index];
        userAnswer = userAnswer + "_correct";

        if (correctAnswer === userAnswer) {
            score++; 
        }
    });

    const percentage = (score / totalQuestions) * 100; 
    const result = {
        score: score,
        totalQuestions: totalQuestions,
        percentage: percentage,
        message: `You scored ${score} out of ${totalQuestions}`,
        category: quiz[0]?.category, 
        difficulty: quiz[0]?.difficulty,
        tags: quiz[0]?.tags, 
        date: new Date()
    };

    const quizResult = new QuizResult(result);
    await quizResult.save();

    res.status(200).json(result);
};

module.exports.getQuizHistory = async (req, res) => {
    const { category, difficulty, tags, limit, from, to } = req.query;
    try {
        const query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (tags) query.tags = tags;

        if (from || to) {
            query.date = {};
            if (from) query.date.$gte = new Date(from);
            if (to) query.date.$lte = new Date(to);
        }

        const history = await QuizResult.find(query).limit(parseInt(limit, 10)).exec();

        res.status(200).json({
            message: 'Quiz history retrieved successfully',
            history: history
        });
    } catch (error) {
        console.error('Error retrieving quiz history:', error.message);
        res.status(500).json({
            message: 'Error retrieving quiz history',
            error: error.message
        });
    }
};
