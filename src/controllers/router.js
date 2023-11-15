import { Router } from 'express';
import * as userController from './user.js';

const User = Router()

User.get('/', userController.fetchUsers)

export default User;
