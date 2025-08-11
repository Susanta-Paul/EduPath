import express from "express"
import {verifyAdmin, verifyJWT} from "../middleware/authMiddleware.js"
import {adminGetAllUsersController,adminGetAllcoursesController,
        adminUpdateRoleController
} from "../controllers/admin.controller.js"
import {body} from "express-validator"


const adminRouter= express.Router()


// get all users
adminRouter.get("/allusers",verifyJWT, verifyAdmin, adminGetAllUsersController)

// get all courses
adminRouter.get("/allcourses", verifyJWT, verifyAdmin, adminGetAllcoursesController)

// update user role
adminRouter.post("/updaterole",[
    body("userId")
        .notEmpty().withMessage("UserId is required")
        .isMongoId().withMessage("UserId must be a valid mongoDb ObjectID"),
    body("updateTo")
        .isString().withMessage("updateTo must be a string")
        .notEmpty().withMessage("UpdateTo is required")
        .trim()
        .isIn(["Student", "Instructor", "Admin"]).withMessage("role must be one of these three: 'Student', 'Instructor', 'Admin'")
], verifyJWT, verifyAdmin, adminUpdateRoleController)


export default adminRouter