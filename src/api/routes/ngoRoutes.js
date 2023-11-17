import { Router } from 'express';
import * as ngoController from '../controllers/ngoController.js';

const Ngo = Router()

Ngo.post('/register', ngoController.createNgo)

Ngo.post('/update', ngoController.updateNgo)

export default Ngo;
