const jwt= require('jsonwebtoken')
const User= require("../models/Users")
exoprts.auth= (req, res ,next ) => {

    try {
        const token= req.body.token || req.header("Authorization").replace('Bearer ', '') || req.cookies.token

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Token not found"
        })
    }

    const decode=jwt.verify(token , process.env.JWT_SECRET)
    const id=decode.payload.id

    req.user=decode
     
    next()

    } catch ( err ) {
        return res.status(401).json({
            success:false,
            message:'Token Invalid'
        })

    }
}

exports.IsStudent= async ( req, res, next ) => {

    try{
        if(req.User.role !== 'Student'){
            return res.status(500).json({
                success:false,
                message:"This is students only route"
            })
        }
        next()

    } catch ( err ) {
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Problem in accesing student only route"
        })
    }
}

exports.IsAdmin= async ( req, res, next ) => {

    try{
        if(req.User.role !== 'Admin'){
            return res.status(500).json({
                success:false,
                message:"This is admin only route"
            })
        }
        next()

    } catch ( err ) {
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Problem in accesing admin route"
        })
    }
}

exports.IsInstructor= async ( req, res, next ) => {

    try{
        if(req.User.role !== 'Instructor'){
            return res.status(500).json({
                success:false,
                message:"This is Instructor only route"
            })
        }
        next()

    } catch ( err ) {
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Problem in accesing Instructor only route"
        })
    }
}