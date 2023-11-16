import * as userService from '../../services/userService.js'

export const createUser = async (req, res) => {
    const userData = req.body;
    const response = await userService.createUser(userData);
    res.status(response.status).json({ message: response.message });
}
