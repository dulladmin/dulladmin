import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import lodash from 'lodash';
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

function makeSorter(collection, sorter) {
  if (sorter == null) return collection;
  return collection.sort((a, b) => {
    if (sorter.direction === 'ascend') {
      return a[sorter.name] > b[sorter.name] ? 1 : -1;
    } else {
      return a[sorter.name] < b[sorter.name] ? 1 : -1;
    }
  });
}

export async function enhance(app) {
  const usersDB = await loadDatabase('./db/users.json');
  const albumsDB = await loadDatabase('./db/albums.json');
  const photosDB = await loadDatabase('./db/photos.json');
  const postsDB = await loadDatabase('./db/posts.json');
  const commentsDB = await loadDatabase('./db/comments.json');
  const todosDB = await loadDatabase('./db/todos.json');
  const administratorsDB = await loadDatabase('./db/administrators.json');

  app.get('/users/index/self', async (req, res) => {
    const data = lodash.cloneDeep(usersDB.data);
    const collection = makeSorter(data, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/albums/index/self', async (req, res) => {
    const data = lodash.cloneDeep(albumsDB.data);
    const collection = makeSorter(data, req.query.sorter);
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
    const data = lodash.cloneDeep(photosDB.data);
    const collection = makeSorter(data, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/posts/index/self', async (req, res) => {
    const data = lodash.cloneDeep(postsDB.data);
    const collection = makeSorter(data, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/comments/index/self', async (req, res) => {
    const data = lodash.cloneDeep(commentsDB.data);
    const collection = makeSorter(data, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/todos/index/self', async (req, res) => {
    const data = lodash.cloneDeep(todosDB.data);
    const collection = makeSorter(data, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/administrators/index/self', async (req, res) => {
    const data = lodash.cloneDeep(administratorsDB.data);
    const collection = makeSorter(data, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
}
