import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(cookieParser());
app.options('*', cors());

app.get('/', );

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on: http://localhost:${process.env.PORT || 3000}`);
})