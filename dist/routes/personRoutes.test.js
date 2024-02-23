"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const personRoutes_1 = __importDefault(require("./personRoutes")); // Substitua pelo caminho real do seu arquivo de roteador
const app = (0, express_1.default)();
app.use(personRoutes_1.default);
describe('Person Router', () => {
    it('should create a new person', async () => {
        const response = await (0, supertest_1.default)(app)
            .post('/')
            .send({ name: 'John Doe', age: 30, email: 'john@example.com' });
        expect(response.status).toBe(201);
        // Verifique outras expectativas conforme necessário
    });
    it('should get all persons', async () => {
        const response = await (0, supertest_1.default)(app).get('/');
        expect(response.status).toBe(200);
        // Verifique outras expectativas conforme necessário
    });
    it('should get a person by ID', async () => {
        const response = await (0, supertest_1.default)(app).get('/1'); // Substitua 1 pelo ID desejado
        expect(response.status).toBe(200);
        // Verifique outras expectativas conforme necessário
    });
    it('should update a person by ID', async () => {
        const response = await (0, supertest_1.default)(app)
            .put('/1') // Substitua 1 pelo ID desejado
            .send({ name: 'Updated Name', age: 35, email: 'updated@example.com' });
        expect(response.status).toBe(200);
        // Verifique outras expectativas conforme necessário
    });
    it('should delete a person by ID', async () => {
        const response = await (0, supertest_1.default)(app).delete('/1'); // Substitua 1 pelo ID desejado
        expect(response.status).toBe(200);
        // Verifique outras expectativas conforme necessário
    });
});
