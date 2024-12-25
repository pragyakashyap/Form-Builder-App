import express from "express";
import authenticateToken from "../../middleware/index.js";
import Workspace from "../../schema/workspace.schema.js";
import User from "../../schema/user.schema.js";

const router = express.Router();

// Create Workspace
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { name, sharedWith } = req.body;
        const { id: userId } = req.user;

        const newWorkspace = new Workspace({
            name,
            owner: userId,
            sharedWith: sharedWith || [],
        });

        const savedWorkspace = await newWorkspace.save();

        // Add the workspace to the user's workspaces array
        await User.findByIdAndUpdate(userId, { $push: { workspaces: savedWorkspace._id } });

        res.status(201).json(savedWorkspace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get All Workspaces for User
router.get("/", authenticateToken, async (req, res) => {
    try {
        const { id: userId } = req.user;

        const workspaces = await Workspace.find({ owner: userId })
            .populate("folders forms")
            .populate("sharedWith.email");

        res.status(200).json(workspaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


export default router