import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
  return res.send('hello from the server!');
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
