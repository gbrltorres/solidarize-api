import { Router } from 'express';
import * as ngoController from '../controllers/ngoController.js';

const Ngo = Router()

Ngo.post('/register', ngoController.createNgo)

Ngo.get('/check-ngo-cnpj', ngoController.checkNgoByCnpj)

Ngo.get('/check-ngo-phone', ngoController.checkNgoByPhoneNumber)

Ngo.put('/update', ngoController.updateNgo)

Ngo.delete('/delete', ngoController.deleteNgo)

export default Ngo;
