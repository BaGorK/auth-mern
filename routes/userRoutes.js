import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const Router = express.Router();

Router.route('/').get(getAllUsers);

export default Router;
