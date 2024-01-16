const mongoose=require('mongoose')
require('dotenv').config()

exports.bdConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Db connection Successful")
    }).catch (
        ( err )=>{
            console.log("Problem in connecting to the DB");
            console.error(err)
            process.exit(1)
        }
    )
}
// module.exports=dbConnect()