import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const Auth = Router()

Auth.post('/login', authController.login)
Auth.post('/logout', authController.logout)

export default Auth;
