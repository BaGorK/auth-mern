import express from 'express';
import {
  getAllUsers,
  signout,
  updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const Router = express.Router();

Router.route('/').get(getAllUsers);
Router.post('/update/:id', verifyToken, updateUser);
Router.delete('/delete/:id', verifyToken, deleteUser);
Router.get('/signout', signout);

export default Router;
