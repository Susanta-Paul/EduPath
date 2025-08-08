import mongoose from "mongoose";


export default async function connectDb(){

    try {
        await mongoose.connect(process.env.MONGO_URI)
        
        console.log("Database Successfully Connected")

    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);

    }

}