import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import tradeRouter from './routes/tradeRouter.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import setupSwagger from './config/swaggerConfig.js';
import heatmapRouter from './routes/heatmapRouter.js';
const app = express();

//setup Swagger docs
setupSwagger(app);

//load env variables
dotenv.config();

//connect to DB
connectDB();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(cookieParser());
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Trading Journal API!');
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/trade', tradeRouter);
app.use('/heatmap', heatmapRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on: http://localhost:${process.env.PORT || 3000}`);
})