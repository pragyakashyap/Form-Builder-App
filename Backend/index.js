import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import connectDB from "./db.js"
import userRoutes from "./routes/authentication/user.js"

connectDB()
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/",userRoutes)

app.get("/",(req,res)=>{
    res.send("Hello world!")
})

app.listen(PORT,()=>{
    console.log(`Port is running on ${PORT}`)
})