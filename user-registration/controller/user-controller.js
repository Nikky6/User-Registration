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
        return error
    }
}