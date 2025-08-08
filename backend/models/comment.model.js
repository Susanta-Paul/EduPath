import mongoose from "mongoose"

const commentSchema= new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const commentModel= mongoose.model("Comment", commentSchema)
export default commentModel