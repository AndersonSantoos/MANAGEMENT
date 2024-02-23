const { config: jestConfig } = require('../config/jest.Config'); // Importa o arquivo de configuração do Jest
import { sequelize } from '../database/dbConfig'; // Importa a instância do sequelize
import Person from './Person.model'; // Importa o modelo Person

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');
    await sequelize.sync({ force: true }); // Isso irá sincronizar os modelos e recriar as tabelas (cuidado em produção!)
    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
});

describe('Person Model', () => {
  it('should define a Person model with correct attributes and validations', async () => {
    try {
      // Cria uma instância de Person
      const person = await Person.create({
        name: 'John Doe',
        age: 30,
        email: 'john@example.com'
      });

      // Verifica se os atributos foram definidos corretamente
      expect(person.registration).toBeDefined();
      expect(person.name).toBe('John Doe');
      expect(person.age).toBe(30);
      expect(person.email).toBe('john@example.com');

      // Tenta criar uma instância de Person com atributos inválidos
      // e verifica se as validações são aplicadas corretamente
      await expect(
        Person.create({
          name: '', // Name é obrigatório
          age: -10, // A idade deve ser um número positivo
          email: 'invalid_email' // Email inválido
        })
      ).rejects.toThrow(); // Espera que a criação falhe devido às validações
    } catch (error) {
      console.error('Error during test:', error);
      throw error; // Se houver um erro, faça o teste falhar explicitamente
    }
  });
});
