import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    workspaces:[{
        type:mongoose.Schema.Types.ObjectId, ref: "Workspace"
    }]
})

const user = mongoose.model("User",userSchema)
export default user