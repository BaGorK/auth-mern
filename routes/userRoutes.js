import express from 'express';
import { getAllUsers, updateUser } from '../controllers/userController.js';

const Router = express.Router();

Router.route('/').get(getAllUsers);
Router.post('/update/:id', updateUser);

export default Router;
