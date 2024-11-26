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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const hash_util_1 = require("../utils/hash.util");
const jwt_1 = require("../utils/jwt");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hashedPassword = yield (0, hash_util_1.hashed)(password);
    const user = user_model_1.default.createUser({
        email,
        password: hashedPassword,
    });
    res.json(user);
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
    if (jwtSecret === "") {
        res.status(404).send({ token: "", error: "jwtSecret not found" });
        return;
    }
    const { email, password } = req.body;
    const user = user_model_1.default.findByEmail(email);
    if (!user) {
        res.status(404).send({ token: "", error: "User not found" });
        return;
    }
    const isMatch = yield (0, hash_util_1.compareHash)(password, user.password);
    if (!isMatch) {
        res.status(401).send({ token: "", error: "Invalid credentials" });
        return;
    }
    // REF: https://qiita.com/knaot0/items/8427918564400968bd2b
    const header = { alg: "HS256", typ: "JWT" };
    const payload = { sub: user.id, iat: Math.floor(Date.now() / 1000) };
    const encodeBase64 = (json) => {
        const jsonStr = JSON.stringify(json);
        // Buffer creates a string which can take an optional encoding parameter to specify how to encode the string.
        const jsonB64 = Buffer.from(jsonStr).toString("base64");
        const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, "");
        return jsonB64NoPadding;
    };
    const unsignedToken = `${encodeBase64(header)}.${encodeBase64(payload)}`;
    const signature = (0, jwt_1.HMAC_SHA256)(jwtSecret, unsignedToken);
    res.status(200).send({ token: `${unsignedToken}.${signature}`, error: "" });
});
exports.default = { addUser, loginUser };
