import { Router } from 'express';
import * as ngoController from '../controllers/ngoController.js';

const Ngo = Router()

Ngo.post('/register', ngoController.createNgo)

export default Ngo;
