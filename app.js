import express from 'express';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import globalErrorHandlerMiddleware from './middlewares/globalErrorHandlerMiddleware.js';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// DEVELOPMENT LOGGING MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));

// BODY PARSER
app.use(cookieParser());
app.use(express.json());

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

export default app;
