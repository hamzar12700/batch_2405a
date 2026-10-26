const express = require("express");

const {signUp , login , getAllUsers, singleUserData , deleteSingleUser} = require("../controller/authController");
const verifiedToken = require("../utils/verifiedToken");
const { default: rateLimit } = require("express-rate-limit");

 

let router = express.Router();

const limiter = rateLimit({
    windowMs:  60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  message : {
    sucess : false,
    message : "apki limit pori ho chuki ha baray meherbani ek ghante bad koshish farmaye"
  }
})

// http://localhost:1000/api/v1/auth/signIn

router.post("/signUp",signUp)
router.post("/login", login)
router.get("/getAllUsers", limiter,getAllUsers)
// router.get("/:id", singleUserData)
// router.delete("/:id", deleteSingleUser)


router.get('/profile',verifiedToken,(req,res)=>{
    return res.json({
        status : true,
        message : "User Profile"
    })
})
// router.get('/picture',verifiedToken,(req,res)=>{
//     return res.json({
//         status : true,
//         message : "User Profile"
//     })
// })














router.get("/",(req,res)=>{
    res.json({
        status : true, 
        messgae : "Data Fetch Successfully",
        data : users
    })
})
router.delete("/",(req,res)=>{
    res.json({
        status : true, 
        messgae : "Data Deleted Successfully"
    })
})
router.put("/",(req,res)=>{
    res.json({
        status : true, 
        messgae : "All Data Upated Successfully"
    })
})
router.patch("/",(req,res)=>{
    res.json({
        status : true, 
        messgae : " Data Upated Successfully"
    })
})

module.exports = router