const mongoose=required('mongoose')

const subsection= new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    description : {
        type:String
    },
    duration:{
        type:Number,
    },
    videoUrl:{
        type:String
    }
})
module.exports=mongoose.model('Subsection',subsection)
