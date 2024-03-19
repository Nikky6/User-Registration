const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

export async function connectDb() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to DataBase')
    } catch (error) {
        console.log('error in connecting Databse',error)
        return error.message
    }
}

export async function disConnectDb() {
    try {
        const disConnect = await mongoose.disconnect(process.env.MONGO_URL);
        console.log('disconnected from Db')
    } catch (error) {
        console.log('error in dsconnecting Db',error)
        return error.message
    }
}

