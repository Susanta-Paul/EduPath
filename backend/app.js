import express from "express"
import {createServer} from "http"
import dotenv  from "dotenv"
import connectDb from "./db/db.js"
import userRouter from "./routes/User.routes.js"

const app=express()
const server=createServer(app)
dotenv.config({override: true})
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use("/user", userRouter)


server.listen(process.env.PORT, ()=>{
    console.log(`Server Successfully running on port ${process.env.PORT}`)
})