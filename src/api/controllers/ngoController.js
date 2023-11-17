import * as ngoService from '../../services/ngoService.js'

export const createNgo = async (req, res) => {
    const ngoData = req.body;
    const userEmail = req.session.email.userEmail;
    const response = await ngoService.createNgo(ngoData, userEmail);
    res.status(response.status).json({ message: response.message });
}

export const updateNgo = async (req, res) => {
    const ngoData = req.body;
    const response = await ngoService.updateNgo(ngoData);
    res.status(response.status).json({ message: response.message });
}

export const deleteNgo = async (req, res) => {
    const ngoData = req.body;
    const response = await ngoService.deleteNgo(ngoData);
    res.status(response.status).json({ message: response.message });
}
