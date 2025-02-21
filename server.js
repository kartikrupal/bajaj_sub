const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(helmet()); 
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later." }
});
app.use(limiter);

// Helper function to separate numbers and alphabets
function processData(input) {
    let numbers = [];
    let alphabets = [];
    let highestAlphabet = [];

    input.forEach(item => {
        if (!isNaN(item)) numbers.push(item);
        else if (typeof item === 'string' && item.length === 1) alphabets.push(item);
    });

    if (alphabets.length) {
        highestAlphabet.push(alphabets.sort((a, b) => b.localeCompare(a))[0]);
    }

    return { numbers, alphabets, highestAlphabet };
}

// ✅ POST Route
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const { numbers, alphabets, highestAlphabet } = processData(data);
        res.json({
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });

    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});

// ✅ GET Route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
