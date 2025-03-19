// tests/users.test.js
const request = require('supertest');
const app = require('../../app');

let token;

beforeAll(async () => {
  // Autentica para obter o token que será utilizado nos testes
  const res = await request(app)
    .post('/auth/login')
    .send({
      email: "admin@spsgroup.com.br",
      password: "1234"
    });
  token = res.body.token;
});

describe('Testes do CRUD de Usuários', () => {
  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Test User",
        email: "test@example.com",
        type: "user",
        password: "password123"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Não deve criar um usuário com e-mail duplicado', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Test User Duplicate",
        email: "test@example.com",
        type: "user",
        password: "password123"
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email já cadastrado');
  });

  it('Deve atualizar um usuário existente', async () => {
    // Primeiro, cria um usuário para atualizar
    const createRes = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "User To Update",
        email: "update@example.com",
        type: "user",
        password: "password123"
      });
    const userId = createRes.body.id;

    const res = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "User Updated"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("User Updated");
  });

  it('Deve remover um usuário existente', async () => {
    // Primeiro, cria um usuário para remover
    const createRes = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "User To Delete",
        email: "delete@example.com",
        type: "user",
        password: "password123"
      });
    const userId = createRes.body.id;

    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Usuário removido com sucesso');
  });
});
