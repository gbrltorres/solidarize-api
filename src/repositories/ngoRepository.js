import { Ngo } from "../models/Ngo.js";

const create = async (ngoData) => {
    const ngo = new Ngo(ngoData);
    await ngo.save();
    return ngo;
};

const findByCode = async (ngoCode) => {
    return await Ngo.findOne({ code: ngoCode });
};

export default {
    create,
    findByCode
};
