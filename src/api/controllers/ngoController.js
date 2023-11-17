import * as ngoService from '../../services/ngoService.js'

export const createNgo = async (req, res) => {
    const ngoData = req.body;
    const userEmail = req.session.email.userEmail;
    const response = await ngoService.createNgo(ngoData, userEmail);
    res.status(response.status).json({ message: response.message });
}
