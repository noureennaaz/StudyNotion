const mongoose=require('mongoose')

const CategorySchema = mongoose.Schema(
    {
        CategoryName:{
            type:String,
            required:true,
            trim:true
        },
        CategoryDesc:{
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