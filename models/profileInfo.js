const mongoose=require('moongose')

const ProfileInfoSchema = new mongoose.Schema({
    contactNumber:{
        type:Number,
        trim:true
    },
    gender:{
        type:String,
        enum:['M', 'F']
    },
    dob:{
        type:Date
    },
    about:{
        type:String,
        trim:true
    },

})

module.exports=mongoose.model( "ProfileInfo" , ProfileInfoSchema)