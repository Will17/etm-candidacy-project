import express, { NextFunction, Request, Response } from "express";
import path from "path";

const app = express();

import config from "./database/config";
import project from "./routes/project";

const port = config.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso una cartella pubblica per i file statici (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint per i progetti.
app.use("/project", project);

// Middleware per Error Handling (non usato)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
});

// Chiamata test per verificare se il servizio è up and running.
app.get("/test", (req, res) => {
    res.send("Server works properly!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});