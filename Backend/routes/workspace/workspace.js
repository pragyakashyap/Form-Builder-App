import express from "express";
import authenticateToken from "../../middleware/index.js";
import Workspace from "../../schema/workspace.schema.js";
import User from "../../schema/user.schema.js";
import mongoose from "mongoose"
import crypto from "crypto"
import authenticate from "../../middleware/authenticate.js";

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

//route to handle sharing workspace
router.post("/share", authenticate,async (req, res) => {
    const { workspaceId, email, permission } = req.body;
    
    if (!workspaceId || !email || !permission) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const workspace = await Workspace.findById(workspaceId);
        const emailExist = await User.findOne({ email });

        if (!emailExist) {
            return res.status(404).json({ message: "User not found" });
        }

        // Preventing user from sharing with themselves
        if (email === req.user.email) {
            return res.status(400).json({ message: "You cannot share the workspace with yourself" });
        }

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        // Adding the user to `sharedWith` if not already present
        const alreadyShared = workspace.sharedWith.some(
            (sharedUser) => sharedUser.email === email
        );

        if (alreadyShared) {
            return res.status(400).json({ message: "Workspace already shared with this user" });
        }

        workspace.sharedWith.push({ email, permission });
        await workspace.save();

        res.status(200).json({ message: "Workspace shared successfully", workspace });
    } catch (error) {
        console.error("Error sharing workspace:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/share-link", authenticate, async (req, res) => {
    const { token } = req.body;

    try {
        const [workspaceId, permission] = Buffer.from(token, "base64")
            .toString("utf-8")
            .split(":");

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        const userEmail = req.user.email;

       
        if (userEmail === req.user.email) {
            return res.status(400).json({ message: "You cannot share the workspace with yourself" });
        }

        const alreadyShared = workspace.sharedWith.some(
            (sharedUser) => sharedUser.email === userEmail
        );

        if (alreadyShared) {
            return res.status(200).json({ message: "Workspace already shared with this user" });
        }

        workspace.sharedWith.push({ email: userEmail, permission });
        await workspace.save();

        res.status(200).json({ message: "Workspace added to your account! Please refresh the page to view." });
    } catch (error) {
        console.error("Error processing shared link:", error);
        res.status(500).json({ message: "Server error" });
    }
});



router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }


    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const workspaces = await Workspace.find({
            $or: [
                { owner: userId },
                { "sharedWith.email": user.email }
            ]
        })
        .populate("folders forms");
        

         const sortedWorkspaces = workspaces.sort((a, b) => {
           
            if (a.owner.toString() === userId && b.owner.toString() !== userId) {
                return -1;
            }
            if (b.owner.toString() === userId && a.owner.toString() !== userId) {
                return 1;
            }
            return 0;
        });

        res.status(200).json(sortedWorkspaces)
    } catch (error) {
        console.log("Error fetching workspace", error)
        res.status(500).json({ message: "Server Error" })
    }
})


export default router