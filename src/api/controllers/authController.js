import userRepository from "../../repositories/userRepository.js";
import bcrypt from "bcrypt";

async function verifyPassword(requestPassword, storedPassword) {
    return await bcrypt.compare(requestPassword, storedPassword);;
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Há campos que não foram preenchidos.'})
        }

        const user = await userRepository.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Nenhum cadastro foi encontrado com o e-mail fornecido' })
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciais do usuário não estão corretas.'})
        }

        req.session.email = { userEmail: email };
        res.send('Login bem-sucedido.');
    } catch (ex) {
        return res.status(502).json({ message: 'Ocorreu algum erro.'})
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send('Usuário foi deslogado.');
};
