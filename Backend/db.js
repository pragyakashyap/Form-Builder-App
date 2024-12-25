import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected successfully.")
    } catch (error) {
        console.log("MongoDB connection error: ",error)
        process.exit(1)
    }
}

export default connectDB