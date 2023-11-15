import * as userServices from '../services/userServices.js'

export const createUser = async (req, res) => {
    try {
        const userInfo = req.body;
        console.log('req', req.body);

        await userServices.createUser(userInfo);
        res.status(201).json();
    } catch (error) {
        res.status(500).json(error);
    }
}
