"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personController_1 = require("../controllers/personController");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        await (0, personController_1.createPersonController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/', async (req, res) => {
    try {
        await (0, personController_1.getAllPersonController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/:id', async (req, res) => {
    try {
        await (0, personController_1.getPersonByIdController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/:id', async (req, res) => {
    try {
        await (0, personController_1.updatePersonController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await (0, personController_1.deletePersonController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.default = router;
