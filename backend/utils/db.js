const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();



async function dbConnect(req , res) {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ MongoDB Connected Successfully via Mongoose');
    } catch (error) {
      console.log(error.message);
      
    }
}




module.exports = dbConnect