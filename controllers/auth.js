import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'

export const register = async (req,res)=>{
  try{
    const {username,password}=req.body
    console.log(username, password);
    const isUser =  await User.findOne({username})
    console.log('работает',isUser._id);
    if(user){
      return res.json({message:'Пользователь с таким именем уже существует'})
    }
    const hash= await bcrypt.hash(password,7)
    console.log(hash);
    const user =  new User({username:username,password:hash})
       await user.save()
       console.log('В базу отправлено');
     
       return res.json({massage:'Пользователь успешно зарегестрирован'})
      }catch(err){
    return   res.json({massage:'Ошибка при регистрации'})
  }
   

}

export const login = async (req,res)=>{
    try{
      const {username,password}=req.body
      const user = await User.findOne({username})
      if(!user){
        return res.json({message:'Неправильное имя'})
      }
      
        console.log(user.password,password);
        const isPassword= bcrypt.compareSync(password,user.password)
        console.log(isPassword);
        if(!isPassword){
          return res.json({message:'Неправильный пароль'})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '30d' })
        console.log(token);
      return res.json({token:token,user})
    }catch(error){
          res.json({message:'Неправильный логин или пароль'})
    }
  }
  export const getMe = async (req,res)=>{
    try{
     const user = await User.findById(req.userid)
     if(!user){
      res.json({message:'Пользователь не найден'})
     }
     const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '30d' })
     console.log(token);
   return res.json({token:token,user})
     
     res.json({user})
    }catch(error){
      res.json({message:'Ошибка при получении'})
    }
  }

  