import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.Mo)
}
app.listen(3000, () => {
    console.log("server is started at port 3000");
})