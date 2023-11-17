import { Router } from 'express';
import * as ngoController from '../controllers/ngoController.js';

const Ngo = Router()

Ngo.post('/register', ngoController.createNgo)

Ngo.put('/update', ngoController.updateNgo)

Ngo.delete('/delete', ngoController.deleteNgo)

export default Ngo;
