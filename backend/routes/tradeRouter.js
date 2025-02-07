import express from 'express'
import verifyJWT from '../middlewares/verifyJWT.js';
import { getUserTrades, getTradeById, createTrade, editTrade, deleteTrade, deleteUserTrades } from '../controllers/tradeController.js'; 
const tradeRouter = express.Router();

tradeRouter.get('/getUserTrades', verifyJWT, getUserTrades)
tradeRouter.get('/getTradeById', verifyJWT, getTradeById)
tradeRouter.post('/createTrade', verifyJWT, createTrade)
tradeRouter.put('/editTrade', verifyJWT, editTrade)
tradeRouter.delete('/deleteTrade', verifyJWT, deleteTrade)
tradeRouter.delete('/deleteUserTrades', verifyJWT, deleteUserTrades)

export default tradeRouter