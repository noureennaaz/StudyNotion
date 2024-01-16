const mongoose=require("mongoose");
const Courses= new mongoose.Schema({

    courseName:{
        type:String,
        required:true
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true
    }],
    description:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    thumbnail:{
        type:String,
    },
    price:{
        type:Number,
    },
    ratingReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    },
    courseContents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section'
    }], 
    TopicsCovered:{
        type:String
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseProgress'
    }]
})

module.exports=mongoose.model('Courses', Courses);