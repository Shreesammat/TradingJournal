import express from 'express'
import verifyJWT from '../middlewares/verifyJWT.js';
import { getUserTrades, getTradeById, createTrade, editTrade, deleteTrade, deleteUserTrades } from '../controllers/tradeController.js'; 
import createTradeValidation from '../middlewares/validations/createTradeValidation.js'
import editTradeValidation from '../middlewares/validations/editTradeValidation.js';
import deleteTradeValidation from '../middlewares/validations/deleteTradeValidation.js';
const tradeRouter = express.Router();

tradeRouter.get('/getUserTrades', verifyJWT, getUserTrades) //✅
tradeRouter.get('/getTradeById', verifyJWT, getTradeById) //✅
tradeRouter.post('/createTrade', verifyJWT, createTradeValidation, createTrade) //✅
tradeRouter.put('/editTrade', verifyJWT, editTradeValidation, editTrade) //✅
tradeRouter.delete('/deleteTrade', verifyJWT, deleteTradeValidation, deleteTrade) //✅
tradeRouter.delete('/deleteUserTrades', verifyJWT, deleteUserTrades) //✅

export default tradeRouter