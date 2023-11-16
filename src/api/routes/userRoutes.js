import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const User = Router()

User.post('/register', userController.createUser)

export default User;
