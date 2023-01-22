import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { buildSuccessResponse } from './utils.mjs';

async function loadDatabase(filename) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filepath = join(__dirname, filename);
  const adapter = new JSONFile(filepath);
  const db = new Low(adapter);
  await db.read();
  return db;
}

export async function enhance(app) {
  const usersDB = await loadDatabase('./db/users.json');
  const albumsDB = await loadDatabase('./db/albums.json');
  const photosDB = await loadDatabase('./db/photos.json');
  const postsDB = await loadDatabase('./db/posts.json');
  const commentsDB = await loadDatabase('./db/comments.json');
  const todosDB = await loadDatabase('./db/todos.json');

  app.get('/users/index/self', async (_req, res) => {
    const collection = usersDB.data;
    res.send(buildSuccessResponse({ collection }));
  });

  app.get('/albums/index/self', async (_req, res) => {
    const collection = albumsDB.data;
    res.send(buildSuccessResponse({ collection }));
  });

  app.get('/photos/index/self', async (_req, res) => {
    const collection = photosDB.data;
    res.send(buildSuccessResponse({ collection }));
  });

  app.get('/posts/index/self', async (_req, res) => {
    const collection = postsDB.data;
    res.send(buildSuccessResponse({ collection }));
  });

  app.get('/comments/index/self', async (_req, res) => {
    const collection = commentsDB.data;
    res.send(buildSuccessResponse({ collection }));
  });

  app.get('/todos/index/self', async (_req, res) => {
    const collection = todosDB.data;
    res.send(buildSuccessResponse({ collection }));
  });
}
