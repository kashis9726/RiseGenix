



const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const db = new sqlite3.Database('risegenix.db');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.post('/api/recommend', (req, res) => {
    const { examType, score, category } = req.body;

    const query = `
        SELECT c.*, co.cutoff_score
        FROM colleges c
        JOIN cutoffs co ON c.id = co.college_id
        WHERE co.exam_type = ? 
        AND co.category = ?
        AND co.year = 2023
        AND co.cutoff_score <= ?
        ORDER BY co.cutoff_score DESC
        LIMIT 5
    `;

    db.all(query, [examType, category, score], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Process the results
        const colleges = rows.map(row => ({
            ...row,
            features: JSON.parse(row.features)
        }));

        res.json(colleges);
    });
});

// ACPC Rank Predictor endpoint
app.post('/api/predict-rank', (req, res) => {
    const { marks, category } = req.body;

    // Simple rank prediction based on marks
    // This is a basic implementation and should be enhanced with more accurate data
    let predictedRank;
    if (category === 'general') {
        predictedRank = Math.floor(marks * 1000);
    } else if (category === 'obc') {
        predictedRank = Math.floor(marks * 1500);
    } else if (category === 'sc') {
        predictedRank = Math.floor(marks * 2000);
    } else if (category === 'st') {
        predictedRank = Math.floor(marks * 2500);
    }

    res.json({ predictedRank });
});

// Authentication routes
app.post('/api/signup', (req, res) => {
    const { name, email, phone } = req.body;

    // Check if user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (user) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Insert new user
        const stmt = db.prepare('INSERT INTO users (name, email, phone) VALUES (?, ?, ?)');
        stmt.run([name, email, phone], function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error creating user' });
            }
            res.json({ success: true, message: 'User registered successfully' });
        });
        stmt.finalize();
    });
});

app.post('/api/login', (req, res) => {
    const { email, phone } = req.body;

    db.get('SELECT * FROM users WHERE email = ? AND phone = ?', [email, phone], (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Remove sensitive data before sending
        delete user.created_at;
        res.json({ success: true, user });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 