import express from "express"
import {userRegisterController, userLoginController, userLogoutController} from "../controllers/user.controller.js"
import {body} from "express-validator"
import {verifyJWT} from "../middleware/authMiddleware.js"

const userRouter=express.Router()


userRouter.post("/register",[
    body("email").trim().isEmail().withMessage("enter a valid email").isLength({min: 10}).withMessage("Email must be at least 10 characters long"),
    body("username").trim().isLength({min: 4}).withMessage("Username must be at least 4 character long"),
    body("fullname").trim().isLength({min: 6}).withMessage("Fullname must be at least 6 character long"),
    body("password").trim().isLength({min: 8}).withMessage("Password must be at least 8 character long"),
    body("role").isIn(["Student", "Instructor"]).withMessage("Invalid role. Must be Student or Instructor")

] ,userRegisterController)

userRouter.post("/login",[
    body("username").trim().isLength({min: 4}).withMessage("Username must be at least 4 character long"),
    body("password").trim().isLength({min: 8}).withMessage("Password must be at least 8 character long"),

] ,userLoginController)

userRouter.get("/signout", verifyJWT, userLogoutController)

userRouter.get("/renewrefreshtoken", userRenewTokenController)

userRouter.get("/profile")



export default userRouter