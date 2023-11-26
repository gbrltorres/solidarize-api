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
            logger.info('[ngoService:createNgo] ' + errorResponse.message);
            return errorResponse;
        }

        const ngo = await ngoRepository.create(ngoData);
        await userRepository.updateUserNgo(userEmail, ngo);

        logger.info('[ngoService:createNgo] ONG cadastrada com sucesso.');
        return { message: 'ONG cadastrada com sucesso.', status: 200 };
    } catch (ex) {
        logger.error('[ngoService:createNgo] ' + ex.message);
        return { message: ex.message, status: 502 };
    }
};

export const listByCategory = async (ngoData) => {
    try {
        const page = parseInt(ngoData.page) || 1;
        const pageSize = parseInt(ngoData.pageSize) || 10;
        const interest = ngoData.interest;

        const filter = interest ? { interests: { $elemMatch: { $eq: interest } } } : {};

        const ngos = await ngoRepository.findByInterest(filter);
        const total = await ngoRepository.countDocuments(filter);

        const response = {
            data: ngos,
            total,
            page,
            totalPages: Math.ceil(total / pageSize),
        };

        if (response) {
            logger.info('[ngoService:listByCategory] ONGs encontradas.');
            return { message: 'ONGs encontradas.', status: 200, ngos: response };
        } else {
            logger.info('[ngoService:listByCategory] Nenhuma ONG foi encontrada.');
            return { message: 'Nenhuma ONG foi encontrada.', status: 404 };
        }
    } catch (ex) {
        logger.error('[ngoService:listByCategory] ' + ex.message);
        return { message: ex.message, status: 502 };
    }
};

export const checkNgoByCnpj = async (ngoData) => {
    try {
        const ngo = await ngoRepository.findByCode(ngoData.cnpj);
        if (ngo) {
            logger.info('[ngoService:checkNgoByCnpj] ONG encontrada.');
            return { message: 'ONG encontrada.', status: 200 };
        } else {
            logger.info('[ngoService:checkNgoByCnpj] ONG não encontrada.');
            return { message: 'ONG não encontrada.', status: 404 };
        }
    } catch (ex) {
        logger.error('[ngoService:checkNgoByCnpj] ' + ex.message);
        return { message: ex.message, status: 502 };
    }
};

export const checkNgoById = async (ngoData) => {
    try {
        const ngoId = ngoData.id;
        const ngo = await ngoRepository.findById(ngoId);
        if (ngo) {
            logger.info('[ngoService:checkNgoById] ONG encontrada.');
            return { message: 'ONG encontrada.', status: 200, ngo: ngo };
        } else {
            logger.info('[ngoService:checkNgoById] ONG não encontrada.');
            return { message: 'ONG não encontrada.', status: 404 };
        }
    } catch (ex) {
        logger.error('[ngoService:checkNgoById] ' + ex.message);
        return { message: ex.message, status: 502 };
    }
};

export const checkNgoByPhoneNumber = async (ngoData) => {
    try {
        const ngo = await ngoRepository.findByPhoneNumber(ngoData.phoneNumber);
        if (ngo) {
            logger.info('[ngoService:checkNgoByPhoneNumber] ONG encontrada.');
            return { message: 'ONG encontrada.', status: 200 };
        } else {
            logger.info('[ngoService:checkNgoByPhoneNumber] ONGk não encontrada.');
            return { message: 'ONG não encontrada.', status: 404 };
        }
    } catch (ex) {
        logger.error('[ngoService:checkNgoByPhoneNumber] ' + ex.message);
        return { message: ex.message, status: 502 };
    }
};

export const updateNgo = async (ngoData) => {
    try {
        const ngo = await ngoRepository.findByCode(ngoData.code);
        if (!ngo) {
            logger.info('[ngoService:updateNgo] ONG não encontrada');
            return { message: 'ONG não encontrada.', status: 404 };
        }

        const errorResponse = await validateNgoData(ngoData, ngoData.code, true);
        if (errorResponse) {
            logger.info('[ngoService:updateNgo] ' + errorResponse.message);
            return errorResponse;
        }
        
        await ngoRepository.update(ngoData);
        logger.info('[ngoService:updateNgo] ONG editada com sucesso.');
        return { message: 'ONG editada com sucesso.', status: 200 };
    } catch (ex) {
        logger.error('[ngoService:updateNgo] ' + ex.message);
        return { message: ex.message, status: 502 };
    }
};

export const deleteNgo = async (ngoCode) => {
    try {
        const ngo = await ngoRepository.findByCode(ngoCode);
        if (!ngo) {
            logger.info('[ngoService:deleteNgo] ONG não encontrada.')
            return { message: 'ONG não encontrada.', status: 404 };
        }

        await ngoRepository.remove(ngoCode);
        logger.info('[ngoService:deleteNgo] ONG removida com sucesso.')
        return { message: 'ONG removida com sucesso.', status: 200 };
    } catch (ex) {
        logger.error('[ngoService:deleteNgo] ' + ex.message);
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
    listByCategory,
    checkNgoByCnpj,
    checkNgoById,
    checkNgoByPhoneNumber,
    updateNgo,
    deleteNgo 
};
