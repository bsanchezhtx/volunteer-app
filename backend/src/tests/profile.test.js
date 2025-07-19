import request from 'supertest';
import app from '../index.js';
import { sign } from '../middleware/auth.js';
import { users } from '../data/seed.js';

const token = sign(users[0]);

const payload = {
  fullName: 'Alice Smith',
  addr1: '123 Main',
  addr2: '',
  city: 'Austin',
  state: 'TX',
  zip: '78701',
  skills: ['teamwork'],
  preferences: '',
  availability: ['2025-07-10']
};

describe('Profile', () => {
  it('saves profile', async () => {
    const r = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
    expect(r.statusCode).toBe(200);
  });

  it('gets profile', async () => {
    const r = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(r.body.fullName).toBe(payload.fullName);
  });
});
