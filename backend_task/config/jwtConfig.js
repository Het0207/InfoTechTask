require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    key: process.env.API_KEY
}


// module.exports.submitQuiz = (req, res) => {
//     const { userAnswers, quiz } = req.body;

//     if (!userAnswers || !quiz) {
//         return res.status(400).json({ message: 'User answers and quiz data are required.' });
//     }

//     let score = 0;
//     let totalQuestions = quiz.length;

//     quiz.forEach((question, index) => {
//         const correctAnswer = Object.keys(question.correct_answers).find(
//             key => question.correct_answers[key] === 'true'
//         );
        
//         const userAnswer = userAnswers[index]; // Get user's answer

//         if (correctAnswer && correctAnswer === userAnswer) {
//             score++;
//         }
//     });

//     const percentage = (score / totalQuestions) * 100;

//     const result = {
//         score: score,
//         totalQuestions: totalQuestions,
//         percentage: percentage,
//         message: `You scored ${score} out of ${totalQuestions}`,
//     };

//     // Return the result with AI-generated feedback
//     res.status(200).json(result);
// };