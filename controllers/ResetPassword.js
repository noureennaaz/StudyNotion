const User= require("../models/Users")
const SendMail = require("../utils/SendMail")
const bcrypt=require('bcrypt')

exports.resetPasswordToken = async ( req, res )=> {
    
    try{
        const { email } = request.body

        const token = self.crypto.randomUUID()
     
        const UserInfo= await User.findOneAndReplace({email} , {
           token:token,
           tokenExpire:Date.now()+1000*60*10
        }, 
        { new: true })
        const url =`https://localhost:3000/reset-password/${token}`
        const subject = 'Reset password link'

        const mail=`<p>Change the password using the following link</p> <a src='${url}'>${url}</a> Only valid for 10 minutes`

        await SendMail(email , subject, mail )

        return res.status(200).json({
            success:true, 
            message:"Password reset Mail Sent"
        })

    } catch ( err ) {
        return res.status(400).json({
            success:false, 
            message:"Reset password token genertion failed"
        })
    }

}

exports.resetPassword= async (res, res) =>{

    try{
        const {password, confirmPassword , token}=request.body

        if(!password|| !confirmPassword){
            return res.status(400).json({
                success:false, 
                message:"Please fill both the fields"
            })
        }
        const user= await User.findOne({token}, {
            token:true, 
            tokenExpire:true
        })
        if(user.token!==token){
            return res.status(400).json({
                success:false, 
                message:"Invalid token for User"
            })

        }
        if(user.tokenExpire < Date.now()){
            return res.status(400).json({
                success:false, 
                message:"Reset password token expired"
            })
            
        }
        const newPassword= bcrypt.hash(password, 10)

        const UpdatedUser= await User.findOneAndUpdate({token},{password:newPassword}  , {new : true})
        
        const subject='Password Update Successful'
        const mail = '<p>Password Update Successful for your Study Notion account</p>'

        return res.status(200).json({
            success:true, 
            message:"Password Reset Successful"
        })

    } catch ( err ){
        return res.status(400).json({
            success:false, 
            message:"Password reset fail"
        })

    }
    

    
}