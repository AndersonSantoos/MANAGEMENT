"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app")); // supondo que o arquivo principal da sua aplicação seja chamado 'app.ts'
const dbConfig_1 = require("../database/dbConfig");
const Person_model_1 = __importDefault(require("../models/Person.model"));
describe('Person routes', () => {
    beforeAll(async () => {
        // Antes de executar os testes, sincronize o modelo Person com o banco de dados
        await dbConfig_1.sequelize.sync({ force: true }); // Isso irá recriar todas as tabelas no banco de dados
    });
    afterEach(async () => {
        // Após cada teste, limpe a tabela Person para evitar efeitos colaterais entre os testes
        await Person_model_1.default.destroy({ truncate: true, cascade: true });
    });
    afterAll(async () => {
        // Após a execução de todos os testes, feche a conexão com o banco de dados
        await dbConfig_1.sequelize.close();
    });
    it('should create a new person', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/person')
            .send({ name: 'John Doe', age: 30, email: 'john@example.com' });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('name', 'John Doe');
        expect(res.body).toHaveProperty('age', 30);
        expect(res.body).toHaveProperty('email', 'john@example.com');
    });
    it('should get all persons', async () => {
        await Person_model_1.default.bulkCreate([
            { name: 'Alice', age: 25, email: 'alice@example.com' },
            { name: 'Bob', age: 35, email: 'bob@example.com' },
        ]);
        const res = await (0, supertest_1.default)(app_1.default).get('/person');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });
    it('should get a person by ID', async () => {
        const person = await Person_model_1.default.create({ name: 'Jane', age: 28, email: 'jane@example.com' });
        const res = await (0, supertest_1.default)(app_1.default).get(`/person/${person.registration}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', 'Jane');
        expect(res.body).toHaveProperty('age', 28);
        expect(res.body).toHaveProperty('email', 'jane@example.com');
    });
    it('should update a person', async () => {
        const person = await Person_model_1.default.create({ name: 'Eve', age: 40, email: 'eve@example.com' });
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/person/${person.registration}`)
            .send({ name: 'Eve Updated', age: 41, email: 'eve_updated@example.com' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', 'Eve Updated');
        expect(res.body).toHaveProperty('age', 41);
        expect(res.body).toHaveProperty('email', 'eve_updated@example.com');
    });
    it('should delete a person by ID', async () => {
        const person = await Person_model_1.default.create({ name: 'Max', age: 50, email: 'max@example.com' });
        const res = await (0, supertest_1.default)(app_1.default).delete(`/person/${person.registration}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe(`Person with ID ${person.registration} has been deleted successfully`);
        const deletedPerson = await Person_model_1.default.findByPk(person.registration);
        expect(deletedPerson).toBeNull();
    });
});
