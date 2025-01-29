import express from 'express';
import { signup } from '../controllers/signup.js';
import { login } from '../controllers/login.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter