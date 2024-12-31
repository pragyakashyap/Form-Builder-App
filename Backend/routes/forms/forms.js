import express from "express";
import authenticateToken from "../../middleware/index.js";
import Form from "../../schema/form.schema.js";
import Folder from "../../schema/folder.schema.js";
import Workspace from "../../schema/workspace.schema.js";
import crypto from "crypto"
import mongoose from "mongoose"

const router = express.Router();

const generateUniqueSlug = () => crypto.randomBytes(8).toString("hex");

// Create Form
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { name, workspaceId, folderId, components } = req.body;
        // Generate unique slug
        const shareableLink = generateUniqueSlug();
        const { id: userId } = req.user;

        const workspace = await Workspace.findById(workspaceId);
        console.log(workspace);

        if (!workspace || workspace.owner.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to add form to this workspace." });
        }

        const newForm = new Form({ name, workspace: workspaceId, folder: folderId || null, components, shareableLink:shareableLink});
        const savedForm = await newForm.save();

        if (folderId) {
            await Folder.findByIdAndUpdate(folderId, { $push: { forms: savedForm._id } });
        }

        await Workspace.findByIdAndUpdate(workspaceId, { $push: { forms: savedForm._id } });

        res.status(201).json(savedForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get All Forms in a Folder or Workspace
router.get("/", authenticateToken, async (req, res) => {
    try {
        const { folderId, workspaceId } = req.query;

        let forms;
        if (folderId) {
            forms = await Form.find({ folder: folderId });
        } else if (workspaceId) {
            forms = await Form.find({ workspace: workspaceId, folder: null });
        } else {
            return res.status(400).json({ message: "Provide folderId or workspaceId." });
        }

        res.status(200).json(forms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Update Form
router.put("/:formId", authenticateToken, async (req, res) => {
    try {
        const { formId } = req.params;
        const { name, components } = req.body;

        const updatedForm = await Form.findByIdAndUpdate(
            formId,
            { name, components },
            { new: true }
        );

        res.status(200).json(updatedForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete Form
router.delete("/:formId", authenticateToken, async (req, res) => {
    try {
        const { formId } = req.params;

        const form = await Form.findByIdAndDelete(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found." });
        }

        // Remove the form reference from folder and workspace
        await Folder.updateMany({ forms: formId }, { $pull: { forms: formId } });
        await Workspace.updateMany({ forms: formId }, { $pull: { forms: formId } });

        res.status(200).json({ message: "Form deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.get("/:formId", authenticateToken, async (req, res) => {
    try {
        const { formId } = req.params;
        const form = await Form.findById(formId);
        if (!form) return res.status(404).json({ message: "Form not found" });
        res.status(200).json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//Fetch Form Data
router.get("/shareable/:shareableLink", async (req, res) => {
    const { shareableLink } = req.params;
  
    if (!shareableLink || typeof shareableLink !== "string") {
      return res.status(400).json({ message: "Invalid shareable link" });
    }
  
    try {
      const form = await Form.findOne({ shareableLink });
  
      if (!form) {
        return res.status(404).json({ message: "Form not found" });
      }
  
      res.status(200).json(form);
    } catch (error) {
      console.error("Error fetching form:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // Increment view count every time the form is viewed
router.post('/track-view', async (req, res) => {
    const { formId } = req.body;

    try {
        const formObjectId = new  mongoose.Types.ObjectId(formId);
        const form = await Form.findById(formObjectId);

        if (form) {
            form.views += 1;
            await form.save();
            res.status(200).send({message:'View tracked'});
        } else {
            res.status(404).send('Form not found');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error tracking view');
    }
});

// Increment start count when user begins filling the form
router.post('/track-start', async (req, res) => {
    const { formId } = req.body;

    try {
        const formObjectId = new  mongoose.Types.ObjectId(formId);
        const form = await Form.findById(formObjectId );
        if (form) {
            form.starts += 1;
            await form.save();
            res.status(200).send({message:'Start tracked'});
        } else {
            res.status(404).send('Form not found');
        }
    } catch (error) {
        res.status(500).send('Error tracking start');
    }
});

// Increment completion count when user submits the form
router.post('/track-completion', async (req, res) => {
    const { formId } = req.body;

    try {
        const formObjectId = new  mongoose.Types.ObjectId(formId);
        const form = await Form.findById(formObjectId);
        if (form) {
            form.completed += 1;
            await form.save();
            res.status(200).send({message:'Completion tracked'});
        } else {
            res.status(404).send('Form not found');
        }
    } catch (error) {
        res.status(500).send('Error tracking completion');
    }
});
  
  

export default router;
