import request from 'supertest';
import app from '../index.js';

describe('Auth', () => {
  const email = 'u1@test.com', pw = 'pass';

  it('registers user', async () => {
    const r = await request(app).post('/api/auth/register').send({ email, password: pw });
    expect(r.statusCode).toBe(200);
    expect(r.body.token).toBeTruthy();
  });

  it('logs in', async () => {
    const r = await request(app).post('/api/auth/login').send({ email, password: pw });
    expect(r.body.token).toBeTruthy();
  });
});

