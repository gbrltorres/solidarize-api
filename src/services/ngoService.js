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
        
        const user = await userRepository.findByEmail(userEmail);
        if (user.ngo) {
            return { message: 'O usuário já possui ONG cadastrada.', status: 400 };
        }

        const ngo = await ngoRepository.create(ngoData);
        await userRepository.updateUserNgo(userEmail, ngo);

        return { message: 'ONG cadastrada com sucesso.', status: 200 };
    } catch (ex) {
        return { message: ex.message, status: 502 };
    }
};

export const updateNgo = async (ngoData) => {
    try {
        const ngo = await ngoRepository.findByCode(ngoData.code);
        if (!ngo) {
            return { message: 'ONG não encontrada.', status: 404 };
        }

        const errorResponse = await validateNgoData(ngoData, ngoData.code);
        if (errorResponse) {
            return errorResponse;
        }
        
        await ngoRepository.update(ngoData);
        return { message: 'ONG editada com sucesso.', status: 200 };
    } catch (ex) {
        return { message: ex.message, status: 502 };
    }
};

export const deleteNgo = async (ngoCode) => {
    try {
        const ngo = await ngoRepository.findByCode(ngoCode);
        if (!ngo) {
            return { message: 'ONG não encontrada.', status: 404 };
        }

        await ngoRepository.remove(ngoCode);
        return { message: 'ONG removida com sucesso.', status: 200 };
    } catch (ex) {
        return { message: ex.message, status: 502 };
    }
};

const validateNgoData = async (ngoData, currentCode = null) => {
    const { error } = ngoValidationSchema.validate(ngoData, { abortEarly: false });
    if (error) {
        return { message: error.details.map(detail => detail.message).join(', '), status: 400 };
    }

    if (!cnpj.isValid(ngoData.code)) {
        return { message: 'O CNPJ fornecido não é válido.', status: 400 };
    }

    const phoneNumberExists = await ngoRepository.findByPhoneNumber(ngoData.phoneNumber);
    if (phoneNumberExists && phoneNumberExists.code !== currentCode) {
        return { message: 'Já existe uma ONG registrada com esse celular.', status: 400 };
    }

    const ngoExists = await ngoRepository.findByCode(ngoData.code);
    if (ngoExists && ngoExists.code !== currentCode) {
        return { message: 'Já existe uma ONG registrada com esse CNPJ.', status: 400 };
    }
};

export default {
    createNgo,
    updateNgo
};
