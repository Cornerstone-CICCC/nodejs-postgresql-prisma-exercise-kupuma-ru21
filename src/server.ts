import express, { Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// Create server
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
import productRouter from "./routes/product.routes";
app.use("/api/products", productRouter);

// 404 Fallback
app.use((_, res: Response) => {
  res.status(404).send("Invalid route");
});

// Start server
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/...");
});
