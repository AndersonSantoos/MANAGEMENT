import { Request, Response } from 'express';
import { 
  createPersonController, 
  getAllPersonController, 
  getPersonByIdController, 
  updatePersonController, 
  deletePersonController 
} from './personController';
import { 
  createPerson, 
  deletePerson, 
  getAllPerson, 
  getPersonById, 
  updatePerson 
} from '../repositories/personRepository';

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
    const req = { body: { name: 'John Doe', age: 30, email: 'john@example.com' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const createdPerson = { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' };
    // Definindo o comportamento do mock da função createPerson
    (createPerson as jest.Mock).mockResolvedValue(createdPerson);

    await createPersonController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdPerson);
  });

  // Adicione testes para os outros controladores aqui

});
