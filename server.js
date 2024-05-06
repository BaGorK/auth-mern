import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.send('hello from the server!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
