import express from "express";
import authenticateToken from "../../middleware/index.js";
import Folder from "../../schema/folder.schema.js";
import Workspace from "../../schema/workspace.schema.js";

const router = express.Router();

// Create Folder
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { name, workspaceId } = req.body;
        const { id: userId } = req.user;

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace || workspace.owner.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to add folder to this workspace." });
        }

        const newFolder = new Folder({ name, workspace: workspaceId });
        const savedFolder = await newFolder.save();

        await Workspace.findByIdAndUpdate(workspaceId, { $push: { folders: savedFolder._id } });

        res.status(201).json(savedFolder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get All Folders in a Workspace
router.get("/:workspaceId", authenticateToken, async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const folders = await Folder.find({ workspace: workspaceId }).populate("forms");

        res.status(200).json(folders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/:folderId",async(req,res)=>{
    const {folderId} = req.params
    try {
        const folder = await Folder.findById(folderId);
        if(!folder){
            return res.status(404).json({message:"Folder not found"})
        }

        await Folder.findByIdAndDelete(folderId)
        res.status(200).json({ message: "Folder deleted successfully" });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Error deleting the folder", error });
    }
})

export default router;
