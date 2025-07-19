import request from 'supertest';
import app from '../index.js';
import { sign } from '../middleware/auth.js';
import { users } from '../data/seed.js';

const token = sign(users[0]);

it('gets notifications', async () => {
  const r = await request(app)
    .get('/api/notifications')
    .set('Authorization', `Bearer ${token}`);
  expect(Array.isArray(r.body)).toBe(true);
});
