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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailsController = exports.loginUserController = exports.createUserController = void 0;
const userService_1 = require("../service/userService");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, dob, firstName, lastName } = req.body;
        if (!username || !email || !password || !dob || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const user = yield (0, userService_1.createUser)({
            username,
            email,
            password,
            dob,
            firstName,
            lastName,
        });
        const _a = user.toJSON(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        return res.status(201).json({
            message: "User created successfully.",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});
exports.createUserController = createUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }
        const data = yield (0, userService_1.loginUser)({ email, password });
        return res.status(200).json({
            message: "Login successful",
            data: data,
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
});
exports.loginUserController = loginUserController;
const getUserDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }
        const user = yield (0, userService_1.getUserDetails)(userId);
        const _b = user.toJSON(), { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
        return res.status(200).json({
            message: "User details fetched successfully",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
exports.getUserDetailsController = getUserDetailsController;
