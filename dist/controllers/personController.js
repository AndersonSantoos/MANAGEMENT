"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePersonController = exports.updatePersonController = exports.getPersonByIdController = exports.getAllPersonController = exports.createPersonController = void 0;
const personRepository_1 = require("../repositories/personRepository");
const createPersonController = async (req, res) => {
    const { name, age, email } = req.body;
    try {
        const createdPerson = await (0, personRepository_1.createPerson)(name, age, email);
        res.status(201).json(createdPerson);
    }
    catch (error) {
        console.error("Error creating person:", error.message);
        res.status(500).send("Error creating person");
    }
};
exports.createPersonController = createPersonController;
const getAllPersonController = async (req, res) => {
    try {
        const persons = await (0, personRepository_1.getAllPerson)();
        res.status(200).json(persons);
    }
    catch (error) {
        console.error("Error getting all persons:", error.message);
        res.status(500).send("Error getting all persons");
    }
};
exports.getAllPersonController = getAllPersonController;
const getPersonByIdController = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const person = await (0, personRepository_1.getPersonById)(id);
        if (!person) {
            res.status(404).send("Person not found");
            return;
        }
        res.status(200).json(person);
    }
    catch (error) {
        console.error("Error getting person by ID:", error.message);
        res.status(500).send("Error getting person by ID");
    }
};
exports.getPersonByIdController = getPersonByIdController;
const updatePersonController = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, email } = req.body;
    try {
        const updatedPerson = await (0, personRepository_1.updatePerson)(id, name, age, email);
        if (!updatedPerson) {
            res.status(404).send("Person not found");
            return;
        }
        res.status(200).json(updatedPerson);
    }
    catch (error) {
        console.error("Error updating person:", error.message);
        res.status(500).send("Error updating person");
    }
};
exports.updatePersonController = updatePersonController;
const deletePersonController = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await (0, personRepository_1.deletePerson)(id);
        res.status(200).send(`Person with ID ${id} has been deleted successfully`);
    }
    catch (error) {
        console.error("Error deleting person:", error.message);
        res.status(500).send("Error deleting person");
    }
};
exports.deletePersonController = deletePersonController;
