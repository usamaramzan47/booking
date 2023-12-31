import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cokieParser from "cookie-parser";
const app  = express ();
dotenv.config();

const connect= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("conected to mongoDB");
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("connection loss!")
})

//middlewares
app.use(cokieParser())
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errormessage = err.message || "something went wrong";

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errormessage,
        stack:err.stack,
    })

})


app.listen(8800,()=>{
    connect();
    console.log("connected to backend!");
})