import express from 'express'
import {getUserProfile, updateUserProfile} from '../controllers/userController.js'
import verifyJWT from '../middlewares/verifyJWT.js';
import nameValidation from '../middlewares/validations/nameValidation.js';
const userRouter = express.Router();

userRouter.get('/getProfile', verifyJWT, getUserProfile);
userRouter.put('/updateProfile', verifyJWT, nameValidation, updateUserProfile);

export default userRouter;