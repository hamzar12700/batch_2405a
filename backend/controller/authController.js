const bcrypt = require('bcrypt');
const authUsers = require("../models/authModel");
var jwt = require('jsonwebtoken');
const { default: nodemailer } = require('nodemailer');
require('dotenv').config()


async function signUp(req, res) {
    try {
        console.log(req.body);


        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.json({
                status: false,
                message: "Fields Data Missing"
            })
        }

        // const saltRound = 10
        const passwordHash = await bcrypt.hash(password, 10);

        const newUsers = new authUsers({
            username,  //username: username
            email,      //email : email
            password: passwordHash,
        })

        await newUsers.save();

const otp = Math.floor(10000+Math.random()*90000);
        const transporter = nodemailer.createTransport({
            host : "smtp.gmail.com",
            port : 587,
            secure : false,
            auth : {
                user : process.env.USER_EMAIL,
                pass : process.env.USER_PASS
            }
        })

        await transporter.sendMail({
            from : process.env.USER_EMAIL,
            to : email,
            subject : "Your Email Verification Email",
            text : `Your OTP Is ${otp} `
        })


        return res.json({
            status: true,
            messgae: "Data Inserted Successfully",
        })
    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                status: false,
                message: "Invalid Credentials"
            })
        }



        // existEmail = abdul
        const existEmail = await authUsers.findOne({ email });

        console.log(existEmail)

        if (!existEmail) {
            return res.json({
                staus: false,
                message: "Email Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, existEmail.password);

        if (!isMatch) {
            return res.json({
                status: false,
                message: "Password Not Correct"
            })
        } else {

            const payload = {
                email:existEmail.email ,
                id: existEmail._id 

            }
           var token = jwt.sign({
            email : payload.email,
            iat : Math.floor(Date.now() / 1000) - 30
           },
              process.env.JWT_SECRET_TOKEN);

              
           res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
                path : "/"
            })   

  return res.json({
                status: true,   
                message: "Users LoggedIn",
               token : token
            })

         


           
        }


    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}



async function getAllUsers(req, res) {
    try {
        const users = await authUsers.find({})

        return res.json({
            status: true,
            message: "All Users Data Fetch",
            data: users
        })


    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }

}


async function singleUserData(req,res) {
    try {
console.log(req.params.id)


        const users = await authUsers.findById(req.params.id);

        if (!users) {
            return res.json({
                status : false  ,
                message : "user id not found"
            })
        }

        return res.json({
            status : true,
            message : "user found successfully",
            data : users
        })
        console.log(users);
        
    } catch (error) {
        console.log(error.message);
        
    }
}




async function deleteSingleUser(req,res){
try {

    console.log(req.params.id);

    const {id} = req.params
    

const users = await authUsers.findByIdAndDelete(id)


if (!users) {
     return res.json({
        status : false,
        message : "users not found"
    })
}


console.log(users);


    return res.json({
        status : true,
        message : "delete data successfully"
    })
} catch (error) {
    console.log(error.message);
    
}
}







module.exports = { login, signUp, getAllUsers , singleUserData , deleteSingleUser  }