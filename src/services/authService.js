import userRepository from '../repositories/userRepository.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

export const login = async (requestData) => {
    try {
        const { email, password } = requestData;

        if (!email || !password) {
            logger.error('Há campos que não foram preenchidos.');
            return { message: 'Há campos que não foram preenchidos.', status: 400 };
        }

        const user = await userRepository.findByEmail(email);

        if (!user) {
            logger.error('Nenhum cadastro foi encontrado com o e-mail fornecido.');
            return { message: 'Nenhum cadastro foi encontrado com o e-mail fornecido.', status: 404 };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            logger.error('Credenciais de usuário incorretas.');
            return { message: 'Credenciais de usuário incorretas.', status: 401 };
        }
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        logger.info('Login realizado com sucesso.');
        return { message: 'Login realizado com sucesso.', status: 200, token: token };
    } catch (error) {
        logger.error(error);
        return { message: error.message, status: 500 };
    }
};

export default {
    login
};