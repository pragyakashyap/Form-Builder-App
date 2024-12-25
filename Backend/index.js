import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import connectDB from "./db.js"
import userRoutes from "./routes/authentication/user.js"
import workspaceRoutes from "./routes/workspace/workspace.js"
import folderRoutes from "./routes/folder/folder.js"
import formRoutes from "./routes/forms/forms.js"

connectDB()
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/user",userRoutes)
app.use("/api/workspaces",workspaceRoutes)
app.use("/api/folders",folderRoutes)
app.use("/api/forms",formRoutes)

app.get("/",(req,res)=>{
    res.send("Hello world!")
})

app.listen(PORT,()=>{
    console.log(`Port is running on ${PORT}`)
})