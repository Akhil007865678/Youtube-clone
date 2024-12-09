const mongoose=require("mongoose");
import dotenv fro

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to Database")
}).catch((error) => {
    throw error;
});