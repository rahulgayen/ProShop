import express from "express";
import colors from "colors";
import "dotenv/config";
import dbConnect from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";
dbConnect();

const app = express();
app.use(express.json())
app.use("/api/products", productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`.yellow.bold);
});
