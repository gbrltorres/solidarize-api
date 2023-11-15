import { Router } from 'express';
import * as userController from '../../controllers/userController.js';

const User = Router()

User.post('/', userController.createUser)

export default User;
