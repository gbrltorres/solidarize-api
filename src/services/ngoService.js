import ngoRepository from '../repositories/ngoRepository.js';
import userRepository from '../repositories/userRepository.js';
import ngoValidationSchema from './validators/ngoValidator.js';
import { cnpj } from 'cpf-cnpj-validator';
import logger from '../config/logger.js';

export const createNgo = async (ngoData) => {
    try {
        const userEmail = ngoData.email;
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

export const checkNgoByCnpj = async (ngoData) => {
    try {
        const ngo = await ngoRepository.findByCode(ngoData.cnpj);
        if (ngo) {
            return { message: 'ONG encontrada.', status: 200 };
        } else {
            return { message: 'ONG não encontrada.', status: 404 };
        }
    } catch (ex) {
        return { message: ex.message, status: 502 };
    }
};

export const checkNgoById = async (ngoData) => {
    try {
        const ngoId = ngoData.id;
        const ngo = await ngoRepository.findById(ngoId);
        if (ngo) {
            return { message: 'ONG encontrada.', status: 200, ngo: ngo };
        } else {
            return { message: 'ONG não encontrada.', status: 404 };
        }
    } catch (ex) {
        return { message: ex.message, status: 502 };
    }
};

export const checkNgoByPhoneNumber = async (ngoData) => {
    try {
        const ngo = await ngoRepository.findByPhoneNumber(ngoData.phoneNumber);
        if (ngo) {
            return { message: 'ONG encontrada.', status: 200 };
        } else {
            return { message: 'ONG não encontrada.', status: 404 };
        }
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
        
        const ngoId = ngoData._id;
        delete ngoData._id;
        delete ngoData.__v;

        const errorResponse = await validateNgoData(ngoData, ngoData.code, true);
        if (errorResponse) {
            return errorResponse;
        }

        await ngoRepository.update(ngoData, ngoId);
        logger.info('ONG editada com sucesso.');
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

const validateNgoData = async (ngoData, currentCode = null, isUpdate = false) => {
    if (!ngoData.email && !isUpdate) {
        return { message: 'O e-mail não foi fornecido.', status: 400 };
    }

    delete ngoData.email;

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

    const ngoCodeExists = await ngoRepository.findByCode(ngoData.code);
    if (ngoCodeExists && ngoCodeExists.code !== currentCode) {
        return { message: 'Já existe uma ONG registrada com esse CNPJ.', status: 400 };
    }
};

export default {
    createNgo,
    updateNgo,
    checkNgoById,
};
