import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import connectDB from "./db.js"
import userRoutes from "./routes/authentication/user.js"
import workspaceRoutes from "./routes/workspace/workspace.js"
import folderRoutes from "./routes/folder/folder.js"
import formRoutes from "./routes/forms/forms.js"
import cors from "cors"

connectDB()
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",  // Localhost for development
            // Netlify app domain
        ];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Specify allowed headers
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions));

app.use("/api/user", userRoutes)
app.use("/api/workspaces", workspaceRoutes)
app.use("/api/folders", folderRoutes)
app.use("/api/forms", formRoutes)

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`)
})