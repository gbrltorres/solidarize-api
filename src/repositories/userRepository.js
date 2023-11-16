import { User } from "../models/User.js";

const create = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const findByEmail = async (userEmail) => {
    return await User.findOne({ email: userEmail });
};

export default {
    create,
    findByEmail
};
