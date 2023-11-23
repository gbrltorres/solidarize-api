import { Router } from 'express';
import * as ngoController from '../controllers/ngoController.js';

const Ngo = Router()

Ngo.post('/register', ngoController.createNgo)

Ngo.get('/check-ngo-cnpj', ngoController.checkNgoByCnpj)

Ngo.get('/check-ngo-id', ngoController.checkNgoById)

Ngo.get('/check-ngo-phone', ngoController.checkNgoByPhoneNumber)

Ngo.delete('/delete', ngoController.deleteNgo)

export default Ngo;
