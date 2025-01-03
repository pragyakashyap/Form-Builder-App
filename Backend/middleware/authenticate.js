import jwt from "jsonwebtoken"
import User from "../schema/user.schema.js";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach the user to the request
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Authentication failed" });
    }
};

export default authenticate
