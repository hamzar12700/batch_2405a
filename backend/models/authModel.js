const mongoose = require("mongoose");


const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength : 8
    },

})

// database --> batch_2405a
// table ---> users

const authUsers = mongoose.model("Users", authSchema);

module.exports = authUsers