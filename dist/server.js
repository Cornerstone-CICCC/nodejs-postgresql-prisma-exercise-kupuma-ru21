"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Routes
const product_routes_1 = __importDefault(require("./routes/product.routes"));
app.use("/api/products", product_routes_1.default);
// 404 Fallback
app.use((_, res) => {
    res.status(404).send("Invalid route");
});
// Start server
app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080/...");
});
