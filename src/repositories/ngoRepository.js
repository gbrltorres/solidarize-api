import { Ngo } from "../models/Ngo.js";

const create = async (ngoData) => {
    const ngo = new Ngo(ngoData);
    await ngo.save();
    return ngo;
};

const findByCode = async (ngoCode) => {
    return await Ngo.findOne({ code: ngoCode });
};

const findByPhoneNumber = async (phoneNumber) => {
    return await Ngo.findOne({ phoneNumber: phoneNumber });
};

const update = async (ngoData) => {
    await Ngo.findOneAndUpdate(
        { code: ngoData.code },
        { $set: ngoData },
        { new: true }
    );
};

export default {
    create,
    findByCode,
    findByPhoneNumber,
    update
};
