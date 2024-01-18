const { request } = require("express")
const User=require('../models/Users')
const OTPModel=require("../models/OTPModel")
const ProfileInfo=require('../models/ProfileInfo')
const bcrypt=require('bcrypt')
const otpgenerator = require('otp-generator')
const jwt =require('jsonwebtoken')
require('dotenv').config()

exports.sendOTP = async ( req, res ) =>{
    try{
        const {email} = request.body
    const existing = await OTPModel.findOne({email})

    if(existing){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
    }

    var otp = otpgenerator.generate( 4 , { upperCaseAlphabets: false , specialChars: false})
    const findSameOtp=await OTPModel.findOne({otp});
    while(findSameOtp){
        otp = otpgenerator.generate( 4 , { upperCaseAlphabets: false , specialChars: false})
        findSameOtp=await OTPModel.findOne({otp});
    }

    const OTPdata= new OTPModel.create({
        email,
        otp,
        createdAt
    })

    return res.status(200).json({
        success:true,
        message:"OTP Generated"
    })
    } catch ( err ){
        console.error (err)
        return res.status(200).json({
            success:false,
            message:"OTP cannot be generated, try again"
        })

    }
}
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

exports.login= async (req, res) =>{

    try {

        const {email , password } =request.body;

    if(!email || !password ){
        return res.status(400).json({
            success:false,
            message: "Please fill all the details"
        })
    }

    const user= await User.findOne({email})

    if(!user){
        return res.status(400).json({
            success:false,
            message: "User not found, try signing in first"
        })
    }

    if(!bcrypt.compare(password, user.password )){
        return res.status(400).json({
            success:false,
            message: "Wrong Password"
        })
    }
     const payload={
        email :user.email , 
        role:user.accountType,
        id : user._id
     }
    var token=await jwt.sign( payload , process.env.JWT_SECRET, {expiresIn :"2h"});
    token= toObject(token)
    user.token=token
    user.password=undefined
    

    res.cookie("token", token , { expires: 1000* 3* 24 * 60 *60  , httpOnly:true }).status(200).json({
        success:true, 
        message:"Successfully logged in"  ,
        token , 
        user
    })

    } catch (err) {
        console.error(err)
        res.status(400).json({
            success:false, 
            message :'Login Failed, try again'
        })
    }
}