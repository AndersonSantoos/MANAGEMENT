"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.getPersonById = exports.getAllPerson = exports.createPerson = void 0;
const Person_model_1 = __importDefault(require("../models/Person.model"));
async function createPerson(name, age, email) {
    try {
        if (!name || !age || !email) {
            throw new Error('Todos os campos devem ser preenchidos.');
        }
        const person = await Person_model_1.default.create({ name, age, email });
        console.log('Pessoa criada com sucesso.');
        return person;
    }
    catch (error) {
        console.error('Erro ao criar pessoa:', error.message);
        throw error;
    }
}
exports.createPerson = createPerson;
async function getAllPerson() {
    try {
        const persons = await Person_model_1.default.findAll();
        console.log('Lista de pessoas obtida com sucesso.');
        return persons;
    }
    catch (error) {
        console.error('Erro ao obter lista de pessoas:', error.message);
        throw error;
    }
}
exports.getAllPerson = getAllPerson;
async function getPersonById(id) {
    try {
        const person = await Person_model_1.default.findByPk(id);
        console.log('Pessoa obtida com sucesso.');
        return person;
    }
    catch (error) {
        console.error('Erro ao obter pessoa por ID:', error.message);
        throw error;
    }
}
exports.getPersonById = getPersonById;
async function updatePerson(registration, name, age, email) {
    try {
        const person = await Person_model_1.default.findByPk(registration);
        if (!person) {
            throw new Error('Pessoa não encontrada.');
        }
        const updatedPerson = await person.update({ name, age, email });
        console.log('Pessoa atualiza com sucesso.');
        return updatedPerson;
    }
    catch (error) {
        console.error('Erro ao atualizar pessoa:', error.message);
        throw error;
    }
}
exports.updatePerson = updatePerson;
async function deletePerson(id) {
    try {
        const person = await Person_model_1.default.findByPk(id);
        if (!person) {
            throw new Error('Pessoa não encontrada');
        }
        await person.destroy();
        console.log('Pessoa excluída com sucesso.');
        return true;
    }
    catch (error) {
        console.error('Erro ao excluir pessoa', error.message);
        throw error;
    }
}
exports.deletePerson = deletePerson;
