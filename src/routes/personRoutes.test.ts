import request from 'supertest';
import express from 'express';
import router from './personRoutes'; // Substitua pelo caminho real do seu arquivo de roteador

const app = express();
app.use(router);

describe('Person Router', () => {
  it('should create a new person', async () => {
    const response = await request(app)
      .post('/')
      .send({ name: 'John Doe', age: 30, email: 'john@example.com' });
    
    expect(response.status).toBe(201);
    // Verifique outras expectativas conforme necessário
  });

  it('should get all persons', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    // Verifique outras expectativas conforme necessário
  });

  it('should get a person by ID', async () => {
    const response = await request(app).get('/1'); // Substitua 1 pelo ID desejado
    
    expect(response.status).toBe(200);
    // Verifique outras expectativas conforme necessário
  });

  it('should update a person by ID', async () => {
    const response = await request(app)
      .put('/1') // Substitua 1 pelo ID desejado
      .send({ name: 'Updated Name', age: 35, email: 'updated@example.com' });
    
    expect(response.status).toBe(200);
    // Verifique outras expectativas conforme necessário
  });

  it('should delete a person by ID', async () => {
    const response = await request(app).delete('/1'); // Substitua 1 pelo ID desejado
    
    expect(response.status).toBe(200);
    // Verifique outras expectativas conforme necessário
  });
});
