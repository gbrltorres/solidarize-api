import userRepository from "../../repositories/userRepository.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Há campos que não foram preenchidos.'})
        }

        const user = await userRepository.findByEmail(email);

        console.log('teste', user);

        if (!user) {
            return res.status(404).json({ message: 'Nenhum cadastro foi encontrado com o e-mail fornecido' })
        }

        console.log('session 1', req.session);
        req.session.email = { userEmail: email };
        console.log('session 2', req.session);
        res.send('Login bem-sucedido.');
    } catch (ex) {
        return res.status(502).json({ message: 'Ocorreu algum erro.'})
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send('Usuário foi deslogado.');
};
