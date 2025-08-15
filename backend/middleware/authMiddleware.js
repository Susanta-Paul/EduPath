import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        reason: "NO_TOKEN",
        message: "No access token found"
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          reason: "TOKEN_EXPIRED",
          message: "Access token expired"
        });
      }
      return res.status(401).json({
        reason: "INVALID_TOKEN",
        message: "Invalid access token"
      });
    }

    const user = await userModel.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).json({
        reason: "USER_NOT_FOUND",
        message: "User not found"
      });
    }

    if (!user.refreshToken) {
      return res.status(401).json({
        reason: "REFRESH_TOKEN_MISSING",
        message: "Please login first"
      });
    }

    req.user = user;
    next();
    
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(500).json({
      reason: "SERVER_ERROR",
      message: "Something went wrong during authentication"
    });
  }
};


export const verifyStudent= async (req, res, next)=>{
    try {
        if(req.user.role !== "Student"){
            return res.status(403).json({message: "Only Students are Authorized to access this route"})
        }

        next()

    } catch (error) {
        res.status(500).json({errors: error})
    }
}

export const verifyInstructor= async (req, res, next)=>{
    try {
        
        if(req.user.role!=="Instructor"){
            return res.status(403).json({message: "Only Instructors are Authorized to access this route"})
        }

        next()

    } catch (error) {
        res.status(500).json({errors: error})
    }
}

export const verifyAdmin= async (req, res, next)=>{
    try {
        
        if(!req.user.role=="Admin"){
            return res.status(403).json({message: "Only Admins are Authorized to access this route"})
        }

        next()

    } catch (error) {
        res.status(500).json({errors: error})
    }
}