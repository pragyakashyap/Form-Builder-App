import express from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../../schema/user.schema.js"
import authenticateToken from "../../middleware/index.js"
import Workspace from "../../schema/workspace.schema.js"

dotenv.config()

const router=express.Router()

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate request body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists. Please login." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser=await newUser.save();   

        const defaultWorkspace = new Workspace({
            name: `${name}'s Workspace`,
            owner: savedUser._id,
            default: true,
        });

        const savedWorkspace = await defaultWorkspace.save();


        // Link workspace to user
        savedUser.workspaces.push(savedWorkspace._id);
        await savedUser.save();

        // Generate a token
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        // Respond with success
        console.log({
            message: "User created successfully",
            token,
            user: savedUser,
            defaultWorkspace: savedWorkspace
        });
        return res.status(201).json({
            message: "User created successfully",
            token,
            user:savedUser,
            defaultWorkspace: savedWorkspace
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        const userExist = await User.findOne({email:email})
        if(!userExist){
            return res.status(400).json({message:"User does not exist."})
        }else{
            const passwordValid = await bcrypt.compare(password,userExist.password)
            if(!passwordValid){
                return res.status(400).json({message:"Invalid password"})
            }
            const token = jwt.sign({email:userExist.email,id:userExist._id},process.env.JWT_SECRET,{expiresIn:'30d'})
            return res.status(200).json({message:"Login Successful",token,id:user._id,name:user.name})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Server Error"})
    }
})

// Update user details route
router.put("/update", authenticateToken, async (req, res) => {
    try {
        const { name, email, oldPassword, newPassword } = req.body;
        const { id } = req.user; // Get the user ID from the token

        // Validate fields
        if (!name && !email  && (!oldPassword || !newPassword)) {
            return res.status(400).json({ message: "Please provide fields to update." });
        }

        const updatedData = {};

        // Add fields to update
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        // Handle password update
        if (oldPassword && newPassword) {
            const existingUser = await User.findById(id);
            if (!existingUser) {
                return res.status(404).json({ message: "User not found." });
            }

            // Verify old password
            const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Old password is incorrect." });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updatedData.password = hashedPassword;
        }

        // Update the user profile in the database
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

export default router 