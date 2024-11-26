"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", product_controller_1.default.queryProducts);
userRouter.post("/create", product_controller_1.default.createProduct);
userRouter.put("/update", product_controller_1.default.updateProduct);
userRouter.delete("/delete", product_controller_1.default.deleteProduct);
exports.default = userRouter;
