import express from "express"
import {createServer} from "http"
import dotenv  from "dotenv"
import connectDb from "./db/db.js"
import userRouter from "./routes/User.routes.js"
import cookieParser from "cookie-parser"
import studentRouter from "./routes/student.route.js"
import instructorRouter from "./routes/instructor.route.js"
import adminRouter from "./routes/admin.route.js"

const app=express()
const server=createServer(app)
dotenv.config({override: true})
connectDb()

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use("/user", userRouter)
app.use("/student", studentRouter)
app.use("/instructor", instructorRouter)
app.use("/admin", adminRouter)


server.listen(process.env.PORT, ()=>{
    console.log(`Server Successfully running on port ${process.env.PORT}`)
})