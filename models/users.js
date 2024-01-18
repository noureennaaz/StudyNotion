const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        trim:true
    },
    accountType:{
        type:String,
        required:true,
        enum:['Student', 'Admin' ,'Instructor']
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    }],
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ProfileInfo"

    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    token:{
        type:String,

    }, 
    tokenExpire:{
        type:Date,
    }

})

module.exports=mongoose.model( "User" , userSchema);