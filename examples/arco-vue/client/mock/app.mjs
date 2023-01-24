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

function makePagination(collection, pagination) {
  const page_size = parseInt(pagination.page_size);
  const current = parseInt(pagination.current);
  const total = collection.length;
  collection = collection.slice((current - 1) * page_size, current * page_size);
  pagination = { page_size, current, total };
  return { collection, pagination };
}

export async function enhance(app) {
  const usersDB = await loadDatabase('./db/users.json');
  const albumsDB = await loadDatabase('./db/albums.json');
  const photosDB = await loadDatabase('./db/photos.json');
  const postsDB = await loadDatabase('./db/posts.json');
  const commentsDB = await loadDatabase('./db/comments.json');
  const todosDB = await loadDatabase('./db/todos.json');

  app.get('/users/index/self', async (req, res) => {
    const collection = usersDB.data;
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/albums/index/self', async (req, res) => {
    const collection = albumsDB.data;
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/albums/:id/show/self', async (req, res) => {
    const model = albumsDB.data.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/albums/:id/show/photos', async (req, res) => {
    const collection = photosDB.data.filter(
      (item) => item.albumId == req.params.id
    );
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/photos/index/self', async (req, res) => {
    const collection = photosDB.data;
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/posts/index/self', async (req, res) => {
    const collection = postsDB.data;
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/comments/index/self', async (req, res) => {
    const collection = commentsDB.data;
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/todos/index/self', async (req, res) => {
    const collection = todosDB.data;
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
}
