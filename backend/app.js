import express from "express"
import {createServer} from "http"
import dotenv  from "dotenv"
import connectDb from "./db/db.js"

const app=express()
const server=createServer(app)
dotenv.config({override: true})
connectDb()


server.listen(process.env.PORT, ()=>{
    console.log(`Server Successfully running on port ${process.env.PORT}`)
})