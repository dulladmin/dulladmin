import jwt from 'jsonwebtoken';
import { buildSuccessResponse, buildFailureResponse } from './utils.mjs';

const administrators = [
  { name: 'admin', role: 'admin', password: '123456' },
  { name: 'user', password: '123456' },
];

export async function enhance(app) {
  app.post('/auth', async (req, res) => {
    const form = req.body.form;
    const admin = administrators.find((u) => u.name === form.username);
    if (admin && admin.password === form.password) {
      const info = { name: admin.name, role: admin.role };
      res.send(buildSuccessResponse({ token: jwt.sign(info, 'secret'), info }));
    } else {
      res.send(buildFailureResponse('Invalid Username or Password'));
    }
  });

  app.delete('/auth', async (_req, res) => {
    res.send(buildSuccessResponse());
  });
}
