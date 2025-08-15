import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const userSchema=new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [6, "Fullname must be atleast 6 character long"]
    }, 
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "Username must be atleast 4 character long"]
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, "Email must be atleast 10 character long"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    }, 
    password:{
        type: String, 
        required: true,
        select: false
    }, 
    role:{
        type: String,
        required: true,
        enum: ["Student", "Instructor", "Admin"]
    },
    refreshToken:{
        type: String,
    }
})

userSchema.methods.generateAccessAndRefreshToken=async function (){
    const accessToken= jwt.sign({username: this.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"})
    const refreshToken=jwt.sign({username: this.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "30d"})

    this.refreshToken = refreshToken; 
    await this.save();  // immediately storing it in DB

    return {accessToken, refreshToken}
}
userSchema.methods.comparePassword= async function (password){
    return await bcrypt.compare(password, this.password)
}
userSchema.statics.generateHashedPassword= async function(password){
    return await bcrypt.hash(password, 10)
}

const userModel= mongoose.model("User", userSchema)

export default userModel