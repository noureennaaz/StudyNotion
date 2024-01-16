const mongoose=require('mongoose')

const RatingsAndReviews = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    ratings:{
        type:number,
        enum:[1, 2 ,3, 4, 5],
        required:true
    },
    reviews:{
        type:String

    }

})
module.exports=mongoose.model("RatingsAndReviews", RatingsAndReviews)