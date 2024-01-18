const Category=require('../models/Category')

exports.showAllCategories= await (req, res) => {
    try{

        const AllCategories= await Category.find({}, {name:true  , description:true})
        return res.status(200).json({
            success:true,
            AllCategories ,
            message:'Fetch successful'
        })

    } catch ( err ){
        console.error( err )
        return res.status(400).json({
            success:false,
            message:"All category Fetch failed"
        })
    }

}

exports.CreateCategory = async ( req, res) => {
    try{
        const {name , description} = request.body;

        if(!name || !description){
            return res.status(400).json({
                success:false, 
                message:"Enter both fields"
            })
        }
        const existing= await Category.findOne({name})
        
        if(existing){
            return res.status(400).json({
                success:false, 
                message:"Category already exist"
            })

        }
        const newCategory= await Category.create({
            name, 
            description,
        })
        
        return res.status(200).json({
            success:true, 
            message:"Category created Successfully"
        })
    } catch (err){
        
        console.erroe(err)
        return res.status(400).json({
            success:false, 
            message:"Problem in creating category , try again"
        })
    }
}

