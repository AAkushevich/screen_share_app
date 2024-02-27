const express = require('express');
const router = express.Router();
const { registerUser, login } = require('../controllers/userController');


// Route handler for registering a user
router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;