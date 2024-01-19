const cloudinary = require('cloudinary').v2

exports.UploadImage = async (file  ,folder , quality , width , height)=>{
    
    var options={folder}
    const {image}= request.body
    if(!file){
        return res.sttus(400).json({
            success:false,
            message: 'No image to upload'
        })
    }
    if(quality){
        options.quality =quality
    }
    if(height){
        options.height=height
    }
    if(width){
        options.width=width
    }

    options.resource_type="auto"

    return cloudinary.uploader.upload(file.tempFilePath, options)

}