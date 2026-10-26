const express = require("express");
const router = require("./Routes/router");
const dbConnect = require("./utils/db");
const cors = require("cors")
require('dotenv').config()

const dns = require ('node:dns');
const cookieParser = require("cookie-parser");
const { default: rateLimit } = require("express-rate-limit");

dns.setServers(['1.1.1.1', '8.8.8.8']);

// middleware
let app = express();
app.use(express.json()) 



const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  credentials: true     // For legacy browser support
};
app.use(cors(corsOptions))
app.use(cookieParser());
app.use('/api/v1/auth', router)

dbConnect()

let PORT = process.env.PORT || 3000
console.log(PORT); 


// app.get('/set-cookie', (req, res) => {
//     res.cookie('username', 'abdulAhad', {
//         maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day (in milliseconds)
//         httpOnly: true,              // Protects against XSS attacks
//         secure: true,                // Ensures cookie is sent only over HTTPS
//         sameSite: 'strict'           // Protects against CSRF attacks
//     });
//     res.send('Cookie has been set!');
// });

// // 3. READ a cookie
// app.get('/get-cookie', (req, res) => {
//     const username = req.cookies.username; // Access standard cookies
//     res.send(`Welcome back, ${username}`);
// });

// http://localhost:1000/api/v1/auth/singup
// http://localhost:1000/api/v1/auth/login
// http://localhost:1000/api/v1/auth/profile
app.listen(PORT , ()=>{
    console.log(`server is running on PORT ${PORT} `);
    
})