import userModel from "../models/user.model.js"
import AppError from "../libs/customErrors.js"


export const userCreateService= async({fullname, email, username, password, role})=>{

    if(!fullname || !email || !username || !password || !role){
        throw new AppError(400, "All Fields are required!") 
    }

    // checking if any user exists with this username and/or email
    const existingUser= await userModel.findOne({
        $or:[{username}, {email}]
    })

    if(existingUser){
        throw new AppError(400, "User Already exists ")
    }

    const hashpassword=await userModel.generateHashedPassword(password)

    try {
        // creating new user
        const user= await userModel.create({fullname, username, email, role, password:hashpassword})

        return user
    } catch (error) {
        throw new AppError(500, error)
    }

}