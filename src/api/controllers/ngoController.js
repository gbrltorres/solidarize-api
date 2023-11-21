import * as ngoService from '../../services/ngoService.js'

export const createNgo = async (req, res) => {
    const ngoData = req.body;
    const response = await ngoService.createNgo(ngoData);
    res.status(response.status).json({ message: response.message });
}

export const checkNgoByCnpj = async (req, res) => {
    const ngoData = req.query;
    const response = await ngoService.checkNgoByCnpj(ngoData);
    res.status(response.status).json({ message: response.message });
}

export const checkNgoByPhoneNumber = async (req, res) => {
    const ngoData = req.query;
    const response = await ngoService.checkNgoByPhoneNumber(ngoData);
    res.status(response.status).json({ message: response.message });
}

export const updateNgo = async (req, res) => {
    const ngoData = req.body;
    const response = await ngoService.updateNgo(ngoData);
    res.status(response.status).json({ message: response.message });
}

export const deleteNgo = async (req, res) => {
    const { code } = req.body;
    const response = await ngoService.deleteNgo(code);
    res.status(response.status).json({ message: response.message });
}
