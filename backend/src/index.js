import express from 'express';
import cors from 'cors';
import "dotenv/config";

import { clerkMiddleware } from '@clerk/nextjs/server'

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
const app = express();

app.use(clerkMiddleware());

const PORT = process.env.PORT;
const FRONT_END_URL = process.env.FRONT_END_URL;

app.use(express.json());
app.use(cors({ origin: FRONT_END_URL , credentials: true }));

app.get("/health", (req, res) => {
    res.status(200).json({ok : true});
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port", PORT)

});