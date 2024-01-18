const mongoose=require('mongoose')

const CategorySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            trim:true
        },
        Courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Courses'
        }]
    }
)
module.exports=mongoose.model('Category', CategorySchema)