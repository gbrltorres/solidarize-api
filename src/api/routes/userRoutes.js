import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const User = Router()

User.post('/register', userController.createUser)

User.get('/check-user', userController.checkUser)

export default User;
