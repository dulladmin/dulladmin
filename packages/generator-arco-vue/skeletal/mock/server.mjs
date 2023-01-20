import express from 'express';
import cors from 'cors';

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

// Routes - POST /auth
app.post('/auth', async (req, res) => {
  const form = req.body.form;
  if (form.username === 'admin' && form.password === 'admin') {
    res.send({
      code: 0,
      msg: 'ok',
      data: { token: 'token', info: { name: 'admin' } },
    });
  } else {
    res.send({
      code: 1,
      msg: 'Invalid Username or Password',
      data: {},
    });
  }
});

// Routes - DELETE /auth
app.delete('/auth', async (_req, res) => {
  res.send({
    code: 0,
    msg: 'ok',
    data: {},
  });
});

// Start
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
