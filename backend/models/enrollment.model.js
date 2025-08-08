import mongoose from "mongoose"


const enrollmentSchema= new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }, 
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // only role student can be here
        required: true,
        validate: {
            validator: async function (userId){
                const user= await mongoose.model("User").findById(userId)
                return user && user.role === "Student";
            },
            message: "Only users with role 'student' can enroll."
        }
    }, 
    progress: {
        type: Number, 
        default: 0
    }, 
    enrollAt: {
        type: Date, 
        default: Date.now
    }, 
    completedVideosIds: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video", 
        }
    ],
    completedQuizIds: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz", 
        }
    ],
})

const enrollmentModel= mongoose.model("Enrollment", enrollmentSchema)

export default enrollmentModel