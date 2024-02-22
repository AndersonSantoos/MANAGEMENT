"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePersonController = exports.updatePersonController = exports.getPersonByIdController = exports.getAllPersonController = exports.createPersonController = void 0;
const personRepository_1 = require("../repositories/personRepository");
async function createPersonController(req, res) {
    const { name, age, email } = req.body;
    try {
        const person = await (0, personRepository_1.createPerson)(name, age, email);
        res.status(201).json(person);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
exports.createPersonController = createPersonController;
async function getAllPersonController(req, res) {
    try {
        const persons = await (0, personRepository_1.getAllPerson)();
        res.status(200).json(persons);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.getAllPersonController = getAllPersonController;
async function getPersonByIdController(req, res) {
    const id = Number(req.params.id);
    try {
        const person = await (0, personRepository_1.getPersonById)(id);
        if (!person) {
            res.status(404).send('Pessoa não encontrada');
        }
        else {
            res.status(200).json(person);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.getPersonByIdController = getPersonByIdController;
async function updatePersonController(req, res) {
    const id = Number(req.params.id);
    const { name, age, email } = req.body;
    try {
        const updatedPerson = await (0, personRepository_1.updatePerson)(id, name, age, email);
        res.status(200).json(updatedPerson);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
exports.updatePersonController = updatePersonController;
async function deletePersonController(req, res) {
    const id = Number(req.params.id);
    try {
        await (0, personRepository_1.deletePerson)(id);
        res.status(200).send(`Pessoa com o id ${id} foi excluído com sucesso!`);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deletePersonController = deletePersonController;
