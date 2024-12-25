import mongoose from "mongoose"

const workSpaceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    },
    default: { type: Boolean, default: false }, 
    sharedWith:[
        {
            email:{type:String,required:true},
            permission:{type:String, enum:["view","edit"],required:true}
        }
    ],
    folders:[{
        type: mongoose.Schema.Types.ObjectId, ref:"Folder"
    }],
    forms:[{
        type: mongoose.Schema.Types.ObjectId, ref:"Form"
    }]
})

const workspace = mongoose.model("Workspace",workSpaceSchema)
export default workspace