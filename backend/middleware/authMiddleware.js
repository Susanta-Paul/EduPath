import jwt from "jsonwebtoken"
import userModel from "../models/user.model"


export const verifyJWT= async (req, res, next)=>{
    try {
        const accessToken= req.cookies.accessToken || req.headers?.authorization?.split(" ")[1]

        if(!accessToken){
            return res.status(401).json({message: "No access token found"})
        }

        const decoded=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    
        const user= await userModel.findOne({username: decoded.username})
        if(!user){
            return res.status(401).json({message: "user not found"})
        }

        if(!user.refreshToken){
            return res.status(401).json({message: "Login First"})
        }

        req.user=user

        next()

    } catch (error) {
        res.status(500).json({error: error})
    }

}

export const verifyStudent= async (req, res, next)=>{
    try {
        if(req.user.role !== "Student"){
            return res.status(403).json({message: "Only Students are Authorized to access this route"})
        }

        next()

    } catch (error) {
        res.status(500).json({errors: error})
    }
}

export const verifyInstructor= async (req, res, next)=>{
    try {
        
        if(req.user.role!=="Instructor"){
            return res.status(403).json({message: "Only Instructors are Authorized to access this route"})
        }

        next()

    } catch (error) {
        res.status(500).json({errors: error})
    }
}

export const verifyAdmin= async (req, res, next)=>{
    try {
        
        if(!req.user.role=="Admin"){
            return res.status(403).json({message: "Only Admins are Authorized to access this route"})
        }

        next()

    } catch (error) {
        res.status(500).json({errors: error})
    }
}