// app.js
require("dotenv").config();
const express = require('express');
const connectDB = require('./db'); // Import the DB connection
const authRoute = require('./routes/authRoute');
const quizRoute = require('./routes/quizRoute');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoute);
app.use("/generateQuiz", quizRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
