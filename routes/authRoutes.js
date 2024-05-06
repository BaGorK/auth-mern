import express from 'express';

const Router = express.Router();

Router.post('/signup', (req, res) => res.send('signup'));

export default Router;
