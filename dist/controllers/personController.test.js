"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personController_1 = require("./personController");
const personRepository_1 = require("../repositories/personRepository");
// Mockando a função createPerson
jest.mock('../repositories/personRepository', () => ({
    ...jest.requireActual('../repositories/personRepository'),
    createPerson: jest.fn(),
}));
describe('Person Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('createPersonController should create a new person', async () => {
        const req = { body: { name: 'John Doe', age: 30, email: 'john@example.com' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const createdPerson = { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' };
        // Definindo o comportamento do mock da função createPerson
        personRepository_1.createPerson.mockResolvedValue(createdPerson);
        await (0, personController_1.createPersonController)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(createdPerson);
    });
    // Adicione testes para os outros controladores aqui
});
