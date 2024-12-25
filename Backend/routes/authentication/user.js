import express from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import user from "../../schema/user.schema.js"

dotenv.config()

const router=express.Router()

router.post("/register",async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required."})
        } 
        const userExist = await user.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exists. Please Login" })
        } else{
            const hashedPassword = bcrypt.hashSync(password,10);
            const newUser = new user({name,email,password:hashedPassword})
            await newUser.save()
            const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'30d'})
            return res.status(200).json({message:"Registration Successful",token,id:user._id,name:user.name})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Server Error"})
    }
})

router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        const userExist = await user.findOne({email:email})
        if(!userExist){
            return res.status(400).json({message:"User does not exist."})
        }else{
            const passwordValid = await bcrypt.compare(password,userExist.password)
            if(!passwordValid){
                return res.status(400).json({message:"Invalid password"})
            }
            const token = jwt.sign({email:userExist.email,id:userExist._id},process.env.JWT_SECRET,{expiresIn:'30d'})
            return res.status(200).json({message:"Login Successful",token,id:user._id,name:user.name})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Server Error"})
    }
})

export default router 