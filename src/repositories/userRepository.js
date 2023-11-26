import { User } from "../models/User.js";

const create = async (userData) => {
    const user = new User(userData);
    await user.save();
};

const findByEmail = async (userEmail) => {
    return await User.findOne({ email: userEmail });
};

const updateUserNgo = async (userEmail, ngo) => {
    const query = { email: userEmail };
    const update = { ngo };

    await User.findOneAndUpdate(query, update, { new: true });
};

const remove = async (userEmail) => {
    const query = { email: userEmail };
    await User.findOneAndDelete(query);
};

export default {
    create,
    findByEmail,
    updateUserNgo,
    remove
};
