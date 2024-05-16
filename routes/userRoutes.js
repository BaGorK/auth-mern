import express from 'express';
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const Router = express.Router();

Router.route('/').get(getAllUsers);
Router.post('/update/:id', verifyToken, updateUser);
Router.delete('/delete/:id', verifyToken, deleteUser);

export default Router;
