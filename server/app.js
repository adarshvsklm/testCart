import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import productRouter from './router/product.js'

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser())

const db = mongoose.connection;

app.use('/', userRouter);
app.use('/product',productRouter)

try {
  mongoose.connect('mongodb://localhost:27017/testCart');
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log('connected ');
  });
} catch (err) {}

app.listen(5000, () => {
  console.log('listening on port 3000');
});
