const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async()=>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error in Connecting DB");
        console.log(error);
        throw error;
    }
}

module.exports = dbConnect;