"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const queryProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const m = yield (0, user_model_1.main)();
    res.json(yield m.queryProducts());
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const m = yield (0, user_model_1.main)();
    const product = yield m.createProduct(req.body);
    res.json(product.id);
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const m = yield (0, user_model_1.main)();
    const product = yield m.updateProduct(req.body);
    res.json(product.id);
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const m = yield (0, user_model_1.main)();
    const product = yield m.deleteProduct(req.body);
    res.json(product.id);
});
exports.default = { queryProducts, createProduct, updateProduct, deleteProduct };
