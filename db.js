import mongoose from 'mongoose'
import { MONGODB_URI, UTN_DB } from './config.js'

//  conexion a la base de datos

export const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_URI}/${UTN_DB}`)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to database", error)
        process.exit(1)
    }
}