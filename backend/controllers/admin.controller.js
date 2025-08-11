import userModel from "../models/user.model.js"
import couseModel from "../models/course.models.js"
import courseModel from "../models/course.models.js"
import {validationResult} from "express-validator"


export const adminGetAllUsersController= async (req, res, next)=>{

    try {
        const allUsers= await userModel.find()

        res.status(200).json({message: "", allUsers},)
    } catch (error) {
        res.status(500).json({errors: error})
    }

}

export const adminGetAllcoursesController= async (req, res, next)=>{

    try {
        const allcourses= await courseModel.find()

        res.status(200).json({message: "", allcourses},)
    } catch (error) {
        res.status(500).json({errors: error})
    }

}

export const adminUpdateRoleController= async (req, res, next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {

        const {userId, updateTo}= req.body

        const user = await userModel.findByIdAndUpdate(
            userId,
            { role: updateTo },
            { new: true }
        );

        res.status(200).json({message: "User Successfully Updated", user})
    } catch (error) {
        res.status(500).json({errors: error})
    }

}