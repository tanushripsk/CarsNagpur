const express = require('express');
const { Register, VerifyEmail } = require('../controller/Auth');

const AuthRoutes = express.Router();

AuthRoutes.post('/register', Register);
AuthRoutes.post('/verify-email', VerifyEmail);

module.exports = AuthRoutes;
