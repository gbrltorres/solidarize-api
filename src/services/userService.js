import { User } from "../models/User.js";

export const createUser = (user) => {
    
    return User.create(user)
}

export const byId = async (id) => {
    return await User
}

