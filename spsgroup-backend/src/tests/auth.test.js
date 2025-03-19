// tests/auth.test.js
const request = require('supertest');
const app = require('../../app');

describe('Testes de Autenticação', () => {
  it('Deve autenticar o usuário e retornar um token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "admin@spsgroup.com.br",
        password: "1234"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Deve falhar ao autenticar com senha incorreta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "admin@spsgroup.com.br",
        password: "senhaErrada"
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Senha incorreta');
  });
});
