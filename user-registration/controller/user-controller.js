import { connectDb, disConnectDb } from '../config/database';
import * as userService from '../service/user-service'

export async function register(event,context){
    try {
        const payload = JSON.parse(event.body) || {}
        await connectDb()
        const result = await userService.registerUser(payload);
        console.log(result)
        await disConnectDb();
        return result
    } catch (error) {
        await disConnectsDb()
        return error
    }
}

export async function login(event){
    try {
        const payload = JSON.parse(event.body);
        await connectDb();
        const result = await userService.login(payload);
        await disConnectDb();
        return result;
    } catch (error) {
        await disConnectDb()
        console.log(error);
        return error
    }
}


export async function userList(){
    try {
        await connectDb();
        const data = await userService.userList();
        await disConnectDb();
        return data
    } catch (error) {
        await disConnectDb();
        console.log('error in getting data',error)
        return error
    }
}

export async function getUserById(event){
    try {
        const payload = event?.pathParameters;
        await connectDb();
        const result = await userService.getUserById(payload);
        await disConnectDb();
        return result
    } catch (error) {
        await disConnectDb()
        console.log(error.message)
        return error.message
    }
}

export async function updateUserDetails(event){
    try {
        const payload = JSON.parse(event.body);
        await connectDb();
        const result = await userService.updateUser(payload);
        await disConnectDb()
        return result
    } catch (error) {
        await disConnectDb();
        console.log('error in updating details',error);
        return error
    }
}

export async function deleteUserDetails(event){
    try {
        const payload = event.pathParameters;
        await connectDb();
        const result = await userService.deleteUser(payload);
        await disConnectDb();
        return result
    } catch (error) {
        await disConnectDb();
        console.log('error in deleting User',error);
        return error
    }
}