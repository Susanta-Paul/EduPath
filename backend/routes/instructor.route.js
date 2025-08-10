import express from "express"
import {verifyInstructor, verifyJWT} from "../middleware/authMiddleware.js"
import {instructorGetCourseController, instructorCreateCourseController,
        instructorUploadVideoController

} from "../controllers/instructor.controller.js"
import {body, param} from "express-validator"
import {uploadMiddleware} from "../middleware/videoMiddleware.js"


const instructorRouter= express.Router()


// get a perticular course
instructorRouter.get("/course/:courseId", [
    param("courseId")
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("courseId must be a mongoDB objectID")
], verifyJWT, verifyInstructor,instructorGetCourseController )


// create Course
instructorRouter.post("/createcourse", [
    body("courseName")
        .notEmpty().withMessage("Course name is required")
        .isString().withMessage("Course name must be a string")
        .isLength({min: 5}).withMessage("Course name must be at least 5 character Long"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string")
        .isLength({min: 20}).withMessage("Description must be at least 20 character Long"),
    body("level")
        .notEmpty().withMessage("Course Level  is required")
        .isString().withMessage("Course Level must be a string")
        .isIn(["Beginner", "Intermediate", "Advanced"]).withMessage("Level must be one of these 'Beginner', 'Intermediate', 'Advanced'"),
    body("instructors")
        .isArray().withMessage("Instructor must be an array"),
    body("instructors.*")
        .isMongoId().withMessage("Each instructor must be a valid MongoDB ObjectId"),

], verifyJWT, verifyInstructor, instructorCreateCourseController)

// upload videos
instructorRouter.post("/uploadvideo",[
    body("title")
        .notEmpty().withMessage("Video Title is Required")
        .isLength({min: 5}).withMessage("Video Title must be at least 5 character long")
        .isString().withMessage("Video Title must be a string"),
    body("course")
        .notEmpty().withMessage("Course is Required")
        .isMongoId().withMessage("Course must be a valid mongoDB ID"),
    body("order")
        .notEmpty().withMessage("Order is Required")
        .isInt({ min: 1 }).withMessage("Order must be a positive integer"),
], verifyJWT, verifyInstructor, 
uploadMiddleware.single("video"), instructorUploadVideoController)


export default instructorRouter