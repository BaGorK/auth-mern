import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import globalErrorHandlerMiddleware from './middlewares/globalErrorHandlerMiddleware.js';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';

const app = express();

// DEVELOPMENT LOGGING MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// BODY PARSER
app.use(express.json());
app.use(cookieParser());

// TEST ROUTE
app.get('/api/v1/test', (req, res) => {
  return res.status(200).json({ message: 'hello server' });
});

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

// UNHANDLED ROUTES
app.use('*', (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ status: 'fail', message: 'Route not found' });
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandlerMiddleware);

// SERVER
const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_LOCAL);

  app.listen(PORT, () =>
    console.log(`DB connected... && server listening on port ${PORT}...`)
  );
} catch (error) {
  console.error('ERROR', error);
  process.exit(1);
}
