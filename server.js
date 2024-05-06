import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/api/v1/test', (req, res) => {
  return res.status(200).json({ message: 'hello server' });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

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
