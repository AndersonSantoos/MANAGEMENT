"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
const dbConfig_1 = require("./database/dbConfig");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/person', personRoutes_1.default);
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try {
        await dbConfig_1.sequelize.sync();
        console.log('Models synced with database successfully.');
    }
    catch (error) {
        console.error('Unable to sync models with database:', error);
    }
});
