const mongoose=require('mongoose')


const courseProgressSchema=new mongoose.Schema({

    courseName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courses',
        required:true
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subsections'
    }]
})

module.exports=mongoose.model("courseProgress" , courseProgressSchema);