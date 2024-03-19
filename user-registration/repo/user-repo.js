const User = require("../models/user-model");

export class UserRepository {

    static async createUser(payload) {
        return await User.create(payload);
    }

    static async userList() {
        return await User.find();
    }

    static async findUserById(payload) {
        return await User.findById(payload?.id);
    }

    static async findUserByEmail(payload) {
        return await User.findOne({ email: payload?.email });
    }

    static async update(payload) {
        return await User.updateOne(payload);
    }

    static async delete(payload) {
        return await User.deleteOne(payload);
    }
}