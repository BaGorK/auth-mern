import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello server' });
});

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_LOCAL);

  app.listen(PORT, () =>
    console.log(`DB connected && server listening on port ${PORT}...`)
  );
} catch (error) {
  console.error('ERROR', error);
  process.exit(1);
}
