import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import User from './models/User.js'


import authRoute from './routes/auth.js'


const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

const Port = process.env.PORT
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_NAME=process.env.DB_NAME

//Routes

app.use('/api/auth',authRoute)

async function start(){
    try{
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hszauzg.mongodb.net/mern-new?retryWrites=true&w=majority`)
        app.listen(Port,()=>{
            console.log("SErver start",Port);
            
           })
    }catch(error){
        console.log(error);
    }
}

start()

//routes


// app.get('/',(req,res)=>{
//     return res.json({
//         message:'Excellent'
//     })
// })


