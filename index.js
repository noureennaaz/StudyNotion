const express=require('express')
const mongoose=require('mongoose')
const app=express();
const connect=require('./config/database').bdConnect
app.use(express.json())
require('dotenv').config()
const PORT=process.env.PORT

app.listen(PORT , ()=>{
    connect()
    console.log(`app is listening at port ${PORT}`)
})