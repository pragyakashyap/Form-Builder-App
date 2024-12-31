import mongoose from "mongoose"
import workspace from "./workspace.schema.js"
import folder from "./folder.schema.js"

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    views: { type: Number, default: 0 },
    starts: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    workspace: {
        type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null
    },
    shareableLink: { type: String, unique: true },
    components: [
        {
            type: {
                type: String,
                enum: ["bubble", "input", "Text", "Image", "Input Text", "Input Number", "Input Phone", "Input Date", "Input Email", "Input Button","Input Rating"],
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
            required: {
                type: Boolean,
                default: false
            },
            options: [{ type: String }] // For buttons or dropdown-like inputs
        }
    ]
});

const Form = mongoose.model("Form", formSchema);
export default Form;