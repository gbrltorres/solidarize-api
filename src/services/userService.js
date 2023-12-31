import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js'
import userValidationSchema from './validators/userValidator.js';
import logger from '../config/logger.js';

export const createUser = async (userData) => {
    try {
        const errorResponse = await validateUserData(userData);
        if (errorResponse) {
            logger.error(errorResponse);
            return errorResponse;
        }

        const encryptedPassword = await encryptPassword(userData.password);
        userData.password = encryptedPassword;
        
        await userRepository.create(userData);
        logger.info('Usuário criado com sucesso.');
        return { message: 'Usuário criado com sucesso.', status: 200 };
    } catch (ex) {
        logger.error(ex.message);
        return { message: ex.message, status: 502 };
    }
};

export const checkUser = async (userData) => {
    try {
        const user = await userRepository.findByEmail(userData.email);
        if (user) {
            logger.info('Usuário encontrado.');
            return { message: 'Usuário encontrado.', status: 200, user: user };
        } else {
            logger.info('Usuário não encontrado.');
            return { message: 'Usuário não encontrado.', status: 404 };
        }
    } catch (ex) {
        logger.error(ex.message);
        return { message: ex.message, status: 502 };
    }
};

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
};

const validateUserData = async (userData) => {
    const { error } = userValidationSchema.validate(userData);
    if (error) {
        return { message: error.details[0].message, status: 400 };
    }

    const userExists = await userRepository.findByEmail(userData.email);
    if (userExists) {
        return { message: 'O e-mail fornecido já está em uso.', status: 400 };
    }
};

export default {
    createUser
};
