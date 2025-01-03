import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import connectDB from "./db.js"
import userRoutes from "./routes/authentication/user.js"
import workspaceRoutes from "./routes/workspace/workspace.js"
import folderRoutes from "./routes/folder/folder.js"
import formRoutes from "./routes/forms/forms.js"
import formResponseRoutes from "./routes/form-response/form-response.js"
import cors from "cors"

connectDB()
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
            "https://form-builder-web-app.netlify.app",
            "https://form-builder-app-zeta.vercel.app"
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
};



app.use(cors(corsOptions)); 
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


app.use(cors(corsOptions));

app.use("/api/user", userRoutes)
app.use("/api/workspaces", workspaceRoutes)
app.use("/api/folders", folderRoutes)
app.use("/api/forms", formRoutes)
app.use("/api/forms-response", formResponseRoutes)

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`)
})