import express from "express";
import colors from "colors";
import "dotenv/config";
import dbConnect from "./config/db.js";

dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`.cyan);
});
