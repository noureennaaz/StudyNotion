const { request } = require("express")
const User=require('../models/Users')
const OTPModel=require("../models/OTPModel")
const ProfileInfo=require('../models/ProfileInfo')
const bcrypt=require('bcrypt')
exports.signup= async ( req, res ) => {

    try {
        const {fname, lname, email , password , confirmPassword, otp, accountType, contactNumber}= request.body;
    
        if(!fname || !lname || !email || !password || !confirmPassword || accountType){
            return req.status(400).json({
                success:false,
                message:"Please fill all the details"
            })
        }
        if(password!==confirmPassword ){
            return req.status(400).json({
                success:false,
                message:"Passwords does not match"
            })
        }
        
        const existingUser =await User.findOne({email});

        if(existingUser){
            return req.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const lastOtp = await OTPModel.findOne({email}).sort({createdAt: -1}).limit(1)

        if(lastOtp.length==0){
            return req.status(400).json({
                success:false,
                message:"No Otp Found"
            })
        }

        if(lastOtp!==otp){
            return req.status(400).json({
                success:false,
                message:"Enter the recent OTP"
            })
        }

        const hashedPassword=bcrypt.hash(password, 10)
        const initials= fname[0] + lname[0]

        const newProfileInfo= await ProfileInfo.create({
            contactNumber,
            about:null,
            dob:null,
            gender:null

        })
        const newUser= await User.create({
            fname,
            lname,
            email,
            password:hashedPassword,
            image:`https://api.dicebear.com/7.x/initials/svg/seed=${fname} ${lname} `,
            accountType
        })

        return res.status(200).json({
            success:true,
            message:'User registration Successful'
        })

    } catch ( err ) {
        return req.status(400).json({
            success:false,
            message:"User cannot be registered. Try again"
        })

    }


}