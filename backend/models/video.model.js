import mongoose from "mongoose"


const videoSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, "Video Title must be at least 5 character Long"]
    }, 
    publicUrl:{
        fileId: {type: String, required: true},
        url: {type: String, required: true},
        name: {type: String, required: true},
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    order: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        required: true, 
        default: 0
    }, 

})

const videoModel= mongoose.model("Video", videoSchema)

export default videoModel