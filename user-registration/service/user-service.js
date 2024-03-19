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
        console.log(newUser)
        return newUser
    } catch (error) {
        return error
    }
}
