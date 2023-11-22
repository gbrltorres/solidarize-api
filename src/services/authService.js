import userRepository from '../repositories/userRepository.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const login = async (requestData) => {
    try {
        const { email, password } = requestData;

        if (!email || !password) {
            return { message: 'Há campos que não foram preenchidos.', status: 400 };
        }

        const user = await userRepository.findByEmail(email);

        if (!user) {
            return { message: 'Nenhum cadastro foi encontrado com o e-mail fornecido.', status: 404 };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return { message: 'Senha inválida.', status: 401 };
        }
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        return { message: 'Login realizado com sucesso.', status: 200, token: token };
    } catch (error) {
        return { message: error, status: 500 };
    }
};

export default {
    login
};