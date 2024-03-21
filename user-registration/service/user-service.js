const { UserRepository } = require("../repo/user-repo");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis.js')

export async function registerUser(payload) {
    try {
        const findUser = await UserRepository.findUserByEmail(payload);
        if (findUser) {
            throw "user already Exists"
        }
        const hashPassword = await bcrypt.hashSync(payload?.password, 15)
        const newUser = await UserRepository.createUser({
            firstName: payload?.firstName,
            lastName: payload?.lastName,
            email: payload?.email,
            password: hashPassword,
            mobile: payload?.mobile,
            gender: payload?.gender,
            age: payload?.age
        });
        return newUser
    } catch (error) {
        return error
    }
}

export async function login(payload) {
    try {
        let { email, password } = data;
        const loginUser = await UserRepository.findUserByEmail(data);
        let bcryptPass = await bcrypt.compare(loginUser?.password, data?.password);
        if (loginUser.email === data.email && bcryptPass) {
            let token = jwt.sign({
                email: data?.email,
                password: data?.password
            },
                'secret', { expiresIn: '1h' });
        }
        return ({
            message: "login success",
            token: token
        });
    } catch (error) {
        return error
    }
}

export async function userList() {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        const redisData = await redisClient.get('users');
        if (redisData) {
            console.log('Data found in Redis cache');
            return JSON.parse(redisData);
        }
        const userData = await UserRepository.userList();
        if (!userData) {
            throw new Error('No data found');
        }
        await redisClient.set('users', JSON.stringify(userData));
        return userData;
    } catch (error) {
        console.error('Error in userList:', error);
        return error;
    }
}

export async function getUserById(payload) {
    try {
        const data = await UserRepository.getUserById(payload?.id);
        if (!data) {
            throw 'No data found'
        }
        return data
    } catch (error) {
        return error
    }
}

export async function updateUser(payload) {
    try {
        const updatedUserData = await UserRepository.updateUser(payload);
        if (!updatedUserData) {
            throw new Error('User update failed');
        }
        await redisClient.del('users');
        const refreshedUserData = await UserRepository.userList();
        await redisClient.set('users', JSON.stringify(refreshedUserData));
        return updatedUserData;
    } catch (error) {
        console.error('Error in updateUser:', error);
        return error;
    }
}

export async function deleteUser(payload) {
    try {
        let findUser = await UserRepository.findUserById(payload?.id);
        if (!findUser) {
            throw "No user Found"
        }
        const result = await UserRepository.deleteUser(payload?.id);
        return result;
    } catch (error) {
        return error
    }
}