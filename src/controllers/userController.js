// userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./../../db');

async function registerUser(req, res) {
    const { username, email, password } = req.body;
  
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Generate JWT token
        const token = jwt.sign({ username, email }, 'your_secret_key', { expiresIn: '2w' });

        // Insert user into the database
        const result = await pool.query(
            'INSERT INTO users (username, email, password, token) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, token]
        );

        res.status(201).json({ user: result.rows[0], token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

  async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Retrieve user from the database
        const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);

        // Check if user exists
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the user's token is still valid
        if (!user.rows[0].token) {
            // If the token is expired or missing, generate a new one
            const token = jwt.sign({ email: user.rows[0].email }, 'secret_key', { expiresIn: '2w' });
            // Update token in the user table
            await pool.query('UPDATE users SET token = $1 WHERE email = $2', [token, email]);
            // Send response with user details and token
            res.status(200).json({ user: user.rows[0], token });
        } else {
            // If the token is still valid, send response with user details and existing token
            res.status(200).json({ id: user.rows[0]['id'], username: user.rows[0]['username'], token: user.rows[0].token });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { registerUser, login };