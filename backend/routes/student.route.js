import express from "express"
import {verifyJWT, verifyStudent} from "../middleware/authMiddleware.js"
import { studentMakeEnrollmentController ,studentViewEnrollmentController, 
    studentViewCourseController, studentGetVideoController,
    studentMarkVideoController, studentAddCommentController,
    studentSubmitQuizController
} from "../controllers/student.controller.js"
import {body, param} from "express-validator"

const studentRouter=express.Router()


// enroll in a particular course
studentRouter.post("/makeenrollment",[ 
    body("courseId")
    .notEmpty().withMessage("courseId is required")
    .isMongoId().withMessage("courseId must be a valid MongoDB ObjectId"),
    
    body("username")
    .notEmpty().withMessage("username is required")
    .isString().withMessage("username must be a string")
    .trim(), 
], verifyJWT, verifyStudent, studentMakeEnrollmentController)


// view all enrollment course
studentRouter.get("/viewenrollment", verifyJWT, verifyStudent, studentViewEnrollmentController)

// view a perticular Course
studentRouter.get("/viewcourse/:courseId",[
    param("courseId")
    .notEmpty().withMessage("courseId is required")
    .isMongoId().withMessage("courseId must be a valid MongoDB ObjectId")
],verifyJWT, verifyStudent, studentViewCourseController)

// watch video
studentRouter.get("/watchvideo/:videoId",[
    param("videoId")
    .notEmpty().withMessage("videoID is required")
    .isMongoId().withMessage("videoID must be a valid mongoDB objectId")
], verifyJWT, verifyStudent, studentGetVideoController )

// mark video as complete
studentRouter.get("/markascomplete/:videoId",[
    param("videoId")
    .notEmpty().withMessage("videoID is required")
    .isMongoId().withMessage("videoID must be a valid mongoDB objectId")
], verifyJWT, verifyStudent, studentMarkVideoController )

// comment on a perticular Video
studentRouter.post("/addcomment", [
    body("videoId")
    .notEmpty().withMessage("videoID is required")
    .isMongoId().withMessage("videoID must be a valid mongoDB objectId"), 
    body("content")
    .notEmpty().withMessage("content is required")
    .isString().withMessage("content must be a string")
    .trim(),
], verifyJWT, verifyStudent, studentAddCommentController)

// submit Quiz
studentRouter.post("/submitquiz/:quizId", [
    param("quizId")
    .notEmpty().withMessage("Quizid is required")
    .isMongoId().withMessage("Invalid quizId format"),
    body().isArray().withMessage("Request body must be an array"),
    body("*.questionIdx")
    .isInt({ min: 0 })
    .withMessage("QuestionIdx must be a non-negative integer"),
    body("*.choosenOptionIdx")
    .isInt({ min: 0 })
    .withMessage("ChoosenOptionIdx must be a non-negative integer"),
], verifyJWT, verifyStudent, studentSubmitQuizController)


export default studentRouter