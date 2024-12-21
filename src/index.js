import dotenv from 'dotenv';
import express from "express";
import connectDB from "./db/index.js"

dotenv.config({
  path: './env',
});

const app = express();

connectDB()
.then(()=>{
  app.on("Error",(error)=>{
    console.log("Error",error)
  })
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("MongoDB connect Failed",err)
})
