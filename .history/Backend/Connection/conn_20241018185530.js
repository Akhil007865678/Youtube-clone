const mongoose=require("mongoose");
import dotenv from '.'

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to Database")
}).catch((error) => {
    throw error;
});