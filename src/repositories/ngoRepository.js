import { Ngo } from "../models/Ngo.js";
import { ObjectId } from "mongodb";

const create = async (ngoData) => {
    const ngo = new Ngo(ngoData);
    await ngo.save();
    return ngo;
};

const findByInterest = async (filter, page, pageSize) => {
    return await Ngo.find(filter)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
};

const countDocuments = async (filter) => {
    return await Ngo.countDocuments(filter);
};

const findByCode = async (ngoCode) => {
    return await Ngo.findOne({ code: ngoCode });
};

const findById = async (ngoId) => {
    return await Ngo.findOne({ _id: new ObjectId(ngoId) });
};

const findByPhoneNumber = async (phoneNumber) => {
    return await Ngo.findOne({ phoneNumber: phoneNumber });
};

const update = async (ngoData) => {
    return await Ngo.findOneAndUpdate(
        { code: ngoData.code },
        { $set: ngoData },
        { new: true }
    );
};

const remove = async (ngoCode) => {
    const query = { code: ngoCode };
    await Ngo.findOneAndDelete(query);
};

export default {
    create,
    countDocuments,
    findByInterest,
    findByCode,
    findById,
    findByPhoneNumber,
    update,
    remove
};
