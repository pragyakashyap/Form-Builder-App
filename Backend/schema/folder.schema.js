import mongoose from "mongoose"

const folderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    workspace:{
        type:mongoose.Schema.Types.ObjectId, ref:"Workspace", required:true
    },
    forms:[{
        type:mongoose.Schema.Types.ObjectId, ref:"Form", ref:"Form"
    }]
})

const folder = mongoose.model("Folder",folderSchema)
export default folder