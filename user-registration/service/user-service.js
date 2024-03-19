const { UserRepository } = require("../repo/user-repo");

export async function registerUser(payload){
    try {
        const findUser = await UserRepository.findUserByEmail(payload);
        if(findUser){
            throw "user already Exists"
        }
        const newUser = await UserRepository.createUser({
            firstName: payload?.firstName,
            lastName:payload?.lastName,
            email:payload?.email,
            password:payload?.password,
            confrimPassword:payload?.confrimPassword,
            mobile:payload?.mobile,
            gender:payload?.gender,
            age:payload?.age
        });
        return newUser
    } catch (error) {
        return error
    }
}


export async function userList(){
    try {
        const data = await UserRepository.userList();
        if(!data){
            throw 'No data found'
        }
        return data
    } catch (error) {
        return error
    }
}

export async function getUserById(payload){
    try {
        const data = await UserRepository.getUserById(payload?.id);
        if(!data){
            throw 'No data found'
        }
        return data
    } catch (error) {
        return error
    }
}

export async function updateUser(payload){
    try {
        let findUser = await UserRepository.findUserByEmail({email:payload?.email});
        if(!findUser){
            throw "No user found"
        }
        const result = await UserRepository.update({
            firstName:payload?.firstName,
            lastName:payload?.lastName,
            email:payload?.email,
            password:payload?.password,
            confrimPassword:payload?.confrimPassword,
            mobile:payload?.mobile,
            gender:payload?.gender,
            age:payload?.age
        });
        return result
    } catch (error) {
        return error
    }
}