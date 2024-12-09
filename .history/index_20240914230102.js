import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to DataBase")
    })
}
app.listen(3000, () => {
    console.log("server is started at port 3000");
})