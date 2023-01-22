import fs from 'node:fs';
import express from 'express';
import expressWinston from 'express-winston';
import cors from 'cors';
import winston from 'winston';

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
    requestWhitelist: ['method', 'url', 'query', 'body'],
    responseWhitelist: ['body'],
  })
);

// Auth
const authFile = new URL('./auth.mjs', import.meta.url).pathname;
const { enhance } = await import(authFile);
await enhance(app);

// Mount App Routes
const appFile = new URL('./app.mjs', import.meta.url).pathname;
if (fs.existsSync(appFile)) {
  const { enhance } = await import(appFile);
  await enhance(app);
}

// Start
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
