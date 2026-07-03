import express from 'express';
import cors from 'cors';
import "dotenv/config";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js"; 

import { clerkMiddleware } from '@clerk/express';

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
const app = express();

app.use(clerkMiddleware());

const PORT = process.env.PORT;
const FRONT_END_URL = process.env.FRONT_END_URL;

const publicDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(cors({ origin: FRONT_END_URL , credentials: true }));

app.get("/health", (req, res) => {
    res.status(200).json({ok : true});
});

if(fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    });
}
app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port", PORT)
    if(process.env.NODE_ENV === "production"){
        job.start();
    }
});