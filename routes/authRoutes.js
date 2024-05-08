import express from 'express';
import { signup, signin, google } from '../controllers/authController.js';

const Router = express.Router();

Router.post('/signup', signup);
Router.post('/signin', signin);
Router.post('/google', google);

export default Router;
