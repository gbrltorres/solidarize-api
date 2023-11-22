import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const Auth = Router()

Auth.post('/login', authController.authenticateUser)
Auth.post('/logout', authController.logout)

export default Auth;
