import express, { NextFunction, Request, Response } from "express";
import path from "path";

const app = express();

import config from "./database/config";
import project from "./routes/project";

const port = config.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Define Node.JS Server Endpoints.
app.use("/project", project);

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
});

// Test call to / endpoint to check if server is running
app.get("/test", (req, res) => {
    res.send("Server works properly!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});