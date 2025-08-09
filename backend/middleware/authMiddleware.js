import jwt from "jsonwebtoken"
import userModel from "../models/user.model"


export const verifyJWT= async (req, res, next)=>{
    try {
        const accessToken= req.cookies.accessToken || req.headers?.authorization?.split(" ")[1]

        if(!accessToken){
            return res.status(401).json({messsage: "No access token found"})
        }

        const decoded=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    
        const user= await userModel.findOne({username: decoded.username})
        if(!user){
            return res.status(401).json({messsage: "user not found"})
        }

        if(!user.refreshToken){
            return res.status(401).json({messsage: "Login First"})
        }

        req.user=user

        next()

    } catch (error) {
        res.status(500).json({error: error})
    }

}