import userRepository from '../repositories/userRepository.js';

export const login = async (requestData) => {
    const { userEmail, password } = requestData;

    if (!userEmail || !password) {
        return res.status(400).json({ message: 'Há campos que não foram preenchidos.'})
    }

    const user = await userRepository.findByEmail(userEmail);

    if (!user) {
        return res.status(404).json({ message: 'Nenhum cadastro foi encontrado com o e-mail fornecido' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha inválida.' })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({ message: "Login realizado com sucesso.", token })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
};

export default {
    login
};