import express from 'express';
import { signup } from '../controllers/auth/signup.js';
import { login } from '../controllers/auth/login.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter