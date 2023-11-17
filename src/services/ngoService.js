import ngoRepository from '../repositories/ngoRepository.js';
import userRepository from '../repositories/userRepository.js';
import ngoValidationSchema from './validators/ngoValidator.js';
import { cnpj } from 'cpf-cnpj-validator';

export const createNgo = async (ngoData, userEmail) => {
    try {
        const errorResponse = await validateNgoData(ngoData);
        if (errorResponse) {
            return errorResponse;
        }
        
        const ngo = await ngoRepository.create(ngoData);
        await userRepository.updateUserNgo(userEmail, ngo);

        return { message: 'ONG cadastrada com sucesso.', status: 200 };
    } catch (ex) {
        return { message: ex.message, status: 502 };
    }
};

const validateNgoData = async (ngoData) => {
    const { error } = ngoValidationSchema.validate(ngoData);
    if (error) {
        return { message: error.details[0].message, status: 400 };
    }

    if (!cnpj.isValid(ngoData.code)) {
        return { message: 'O CNPJ fornecido não é válido.', status: 400 };
    } 

    const phoneNumberExists = await ngoRepository.findByPhoneNumber(ngoData.phoneNumber);
    if (phoneNumberExists) {
        return { message: 'Já existe uma ONG registrada com esse celular.', status: 400 };
    }

    const ngoExists = await ngoRepository.findByCode(ngoData.code);
    if (ngoExists) {
        return { message: 'Já existe uma ONG registrada com esse CNPJ.', status: 400 };
    }
};

export default {
    createNgo
};
