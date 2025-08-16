import mongoose from "mongoose"
import userModel from "../models/user.model.js"


const courseSchema= new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        minlength: [5, "Course name must be at least 5 character Long"]
    }, 
    description: {
        type: String,
        required: true, 
        minlength: [20, "Course Description must be at least 20 character Long"]
    },
    duration:{
        number: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true, 
            enum: ["Hours", "Days", "Months"]
        }
    },
    level: {
        type: String,
        required: true, 
        enum: ["Beginner", "Intermediate", "Advanced"]
    }, 
    instructors: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // referencing the User Model
        required: true,
        validate:{
            validator: async function (userId) {

                const user= await mongoose.model("User").findById(userId)
                return user && user.role=="Instructor"
            },
            message: "Only Instructor can create a course."
        }
    }],
    image:{
        type: String,
        required: true
    }
})
courseSchema.statics.validateInstructors = async function (instructorIds) {
    const count = await userModel.countDocuments({
        _id: { $in: instructorIds },
        role: "Instructor"
    });
    return count === instructorIds.length;
};


const courseModel= mongoose.model("Course", courseSchema)

export default courseModel