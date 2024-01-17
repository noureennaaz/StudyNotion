const mongoose=require('mongoose')
const SendMail = require('../utils/SendMail')

const OTPModel=mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 10*60
    }

})

async function MailSend(email, otp){
   try{

    await SendMail(email , otp)
    console.log('Mail Sent Successfully')
   } 
   catch ( err ){
    console.log("error occured while Sending the mail")
    throw err;
   }
  
}
OTPModel.pre( "save", async function (doc, next){
    try {
        await MailSend(doc.email, doc.otp)

    } catch ( err ){
        console.log("error occured while Sending the mail")
    }
    
    next();
})

module.exports=mongoose.model('OTPModel', OTPModel)