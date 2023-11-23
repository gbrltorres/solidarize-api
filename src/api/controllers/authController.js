import * as authService from "../../services/authService.js";

export const authenticateUser = async (req, res) => {
    const ngoData = req.body;
    const response = await authService.login(ngoData);
    req.session.token = response.token;
    req.session.email = ngoData.email;
    res.status(response.status).json({ message: response.message, token: response.token });
}

export const logout = (req, res) => {
    req.session.destroy();
    res.status(200).send('Usuário foi deslogado.');
};
