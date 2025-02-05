import express from 'express'
import {getUserProfile} from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
const userRouter = express.Router();

userRouter.get('/profile', authMiddleware, getUserProfile);

export default userRouter