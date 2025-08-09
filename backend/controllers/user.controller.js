import userModel from "../models/user.model.js"
import {validationResult} from "express-validator"
import {userCreateService} from "../service/user.service.js"
import jwt from "jsonwebtoken"




export const userRegisterController= async (req, res, next)=>{

    const errors= validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, username, password, role}=req.body

    try {
        const user= await userCreateService({fullname, email, username, password,role})
        const safeUser=user.toObject()
        delete safeUser.password;

        const {accessToken, refreshToken}= user.generateAccessAndRefreshToken()

        const options={
            httpOnly: true,
            secure: true,
        }

        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)
        res.status(201).json({message: "User Successfully Created", accessToken, refreshToken, safeUser})

    } catch (error) {
        const status=error.statusCode || 500
        res.status(status).json({error: error.message})
    }

}

export const userLoginController= async (req, res, next)=>{

    const errors= validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {username, password}=req.body

    try {
        const user= await userModel.findOne({username}).select("+password")

        if(!user){
            return res.status(401).json({message: "Invalid username and/or password"})
        }

        const isMatch= await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({message: "Invalid username and/or password"})
        }
        const safeUser=user.toObject()
        delete safeUser.password;

        const {accessToken, refreshToken}= await user.generateAccessAndRefreshToken()

        const options={httpOnly: true, secure: true}

        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)
        res.status(200).json({message: "User LoggedIn Successfully ", accessToken, refreshToken, safeUser})

    } catch (error) {
        res.status(500).json({errors: error})
    }

}

export const userLogoutController= async (req, res, next)=>{

    try {
        const user= await userModel.findOneAndUpdate(
            req.user.username,
            {$unset:{refreshToken:1}}, // this removes the field from document
            {new: true}
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({message: "User logged Out"})

    } catch (error) {
        res.status(500).json({errors: error})
    }

}

export const userRenewTokenController= async (req, res, next)=>{

    const incomingToken= req.cookies.refreshToken

    if(!incomingToken){
        return res.status(401).json({message: "No refresh Token Found"})
    }
    
    try {
        
        const decoded=jwt.verify(incomingToken, REFRESH_TOKEN_SECRET)
        const user= await userModel.findOne({username: decoded.username})

        if(!user){
            return res.status(401).json({message: "Invalid Token"})
        }

        if(user.refreshToken !== incomingToken){
            return res.status(401).json({message: "Invalid Token"})
        }

        const {accessToken, refreshToken}=await user.generateAccessAndRefreshToken()

        const options={httpOnly: true, secure: true}

        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)
        res.status(200).json({message:"successfull token updated", accessToken, refreshToken})

    } catch (error) {
        res.status(500).json({errors: error})
    }

}