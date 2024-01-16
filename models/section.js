const mongoose=require('mongoose')

const SectionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String

    },
    subsections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subsection'
    }]

})

module.exports=mongoose.model("Section", SectionSchema)