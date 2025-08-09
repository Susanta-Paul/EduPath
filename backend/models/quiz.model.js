import mongoose from "mongoose"

const quizSchema= new mongoose.Schema({
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        validate: {
            validator: async function (userId){
                const user= await mongoose.model("User").findById(userId)
                return user && user.role=="Instructor"
            }, 
            message: "Only Instructor Can Upload Quizes."
        }
    },
    allQues: [{
        question:{
            type: String,
            required: true
        },
        answer: {
            type: Number, // idx of the correct option
            required: true,
            validate: {
                validator: function (val) {
                    return this.options && val >= 0 && val < this.options.length;
                },
                message: "Answer index must be a valid option index."
            }
        },
        options: {
            type: [String],
            required: true,
            validate: {
                validator: arr => Array.isArray(arr) && arr.length > 0,
                message: "Each question must have at least one option."
            }
        }
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const quizModel= mongoose.model("Quiz", quizSchema)
export default quizModel