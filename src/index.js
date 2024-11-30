"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseConfig_1 = require("./config/databaseConfig");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3001;
const version = "v1";
app.use(express_1.default.json());
(0, databaseConfig_1.startServer)();
app.use(`/api/${version}`, userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
