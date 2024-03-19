import { connectDb, disConnectionDb } from '../config/database';
import * as userService from '../service/user-service'

export async function register(event,context){
    try {
        const payload = JSON.parse(event.body)
        await connectDb()
        const result = await userService.registerUser(payload);
        console.log(result)
        await disConnectionDb();
        return result
    } catch (error) {
        await disConnectionDb()
        return error
    }
}

export async function userList(){
    try {
        await connectDb();
        const data = await userService.userList();
        await disConnectionDb();
        return data
    } catch (error) {
        await disConnectionDb();
        console.log('error in getting data',error)
        return error
    }
}