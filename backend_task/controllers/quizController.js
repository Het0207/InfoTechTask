const jwt_config = require('../config/jwtConfig');
const axios = require('axios');
const api_key = jwt_config.key;

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

module.exports.submitQuiz = (req, res) => {
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
        console.log(correctAnswer);

        var userAnswer = userAnswers[index];
        userAnswer = userAnswer+"_correct"
        console.log(userAnswer)

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
    };
    res.status(200).json(result);
};



// module.exports.submitQuiz = (req, res) => {
//     // const {useranswer, quiz} = req.body;
    
//     // quiz.forEach((question,index) => {
        
//     // });
//     const quiz = req.body
//     console.log(quiz.quiz[0].question);

//     \
// };
