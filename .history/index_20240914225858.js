import express from 'express';
import mongoose from "mongoose";
import dotenv from 

const app = express();

app.listen(3000, () => {
    console.log("server is started at port 3000");
})