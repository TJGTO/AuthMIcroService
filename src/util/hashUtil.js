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
exports.generateToken = exports.verifyPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_SALT = process.env.SECRET_SALT;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;
// Hash password with secret salt
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Combine the secret salt with the raw password
        const saltedPassword = `${SECRET_SALT}${password}`;
        // Generate the hash
        const saltRounds = SALT_ROUNDS ? parseInt(SALT_ROUNDS) : 10;
        const hashedPassword = yield bcryptjs_1.default.hash(saltedPassword, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw new Error(`Error hashing password: ${error.message}`);
    }
});
exports.hashPassword = hashPassword;
// Verify password with secret salt
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltedPassword = `${SECRET_SALT}${password}`;
        return yield bcryptjs_1.default.compare(saltedPassword, hashedPassword);
    }
    catch (error) {
        throw new Error(`Error verifying password: ${error.message}`);
    }
});
exports.verifyPassword = verifyPassword;
const generateToken = (user) => {
    const payload = { id: user.id, email: user.email };
    const options = { expiresIn: "1h" };
    if (JWT_SECRET) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
    }
    throw new Error("Secret is not defined");
};
exports.generateToken = generateToken;
