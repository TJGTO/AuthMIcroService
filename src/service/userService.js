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
exports.getUserDetails = exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const hashUtil_1 = require("../util/hashUtil");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, hashUtil_1.hashPassword)(data.password);
        const user = yield userModel_1.default.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        return user;
    }
    catch (error) {
        throw new Error(`Unable to create user: ${error.message}`);
    }
});
exports.createUser = createUser;
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ where: { email: data.email } });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = yield (0, hashUtil_1.verifyPassword)(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = (0, hashUtil_1.generateToken)(user);
        return { token };
    }
    catch (error) {
        throw new Error(`Login error: ${error.message}`);
    }
});
exports.loginUser = loginUser;
const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw new Error(`Error fetching user details: ${error.message}`);
    }
});
exports.getUserDetails = getUserDetails;
