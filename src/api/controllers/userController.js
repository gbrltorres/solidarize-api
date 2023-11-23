import * as userService from '../../services/userService.js'

export const createUser = async (req, res) => {
    const userData = req.body;
    const response = await userService.createUser(userData);
    res.status(response.status).json({ message: response.message });
}

export const checkUser = async (req, res) => {
    const userData = req.query;
    const response = await userService.checkUser(userData);
    res.status(response.status).json(response);
}
