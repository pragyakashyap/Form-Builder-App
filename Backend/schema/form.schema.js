import mongoose from "mongoose"
import workspace from "./workspace.schema.js"
import folder from "./folder.schema.js"

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workspace: {
        type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null
    },
    components: [
        {
            type: {
                type: String,
                enum: ["bubble", "input"],
                required: true
            },
            subType: {
                type: String,
                enum: ["text", "image", "textInput", "email", "number", "phone", "date", "rating", "buttons"],
                required: true
            },
            name: {
                type: String
            },
            category: {
                type: String, // Added category field
                enum: ["bubble", "input"], // Specify allowed values explicitly
                required: true,
            },
            content: {
                type: String // For bubble text or image URL
            },
            label: {
                type: String //for input fields
            },
            required: {
                type: Boolean,
                default: false
            },
            options: [{ type: String }] // For buttons or dropdown-like inputs

        }
    ]
})

const form = mongoose.model("Form",formSchema)
export default form