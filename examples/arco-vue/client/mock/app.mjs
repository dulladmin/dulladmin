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

function makeSearch(collection, search) {
  if (search == null) return collection;
  Object.keys(search).forEach((s) => {
    const [name, predicate] = s.split('_');
    switch (predicate) {
      case 'eq':
        collection = collection.filter((v) => {
          return String(v[name]) == search[s];
        });
        return;
      case 'cont':
        collection = collection.filter((v) => {
          return v[name].includes(search[s]);
        });
      default:
        return;
    }
  });
  return collection;
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
  const administratorsDB = await loadDatabase('./db/administrators.json');

  app.get('/users/index/self', async (req, res) => {
    let collection = lodash.cloneDeep(usersDB.data);
    collection = makeSearch(collection, req.query.search);
    collection = makeSorter(collection, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/users/:id/show/self', async (req, res) => {
    const collection = usersDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });

  app.get('/albums/index/self', async (req, res) => {
    let collection = lodash.cloneDeep(albumsDB.data);
    collection = makeSearch(collection, req.query.search);
    collection = makeSorter(collection, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/albums/:id/show/self', async (req, res) => {
    const collection = albumsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/albums/:id/show/photos', async (req, res) => {
    let collection = photosDB.data;
    collection = collection.filter((item) => item.albumId == req.params.id);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });

  app.get('/photos/index/self', async (req, res) => {
    let collection = lodash.cloneDeep(photosDB.data);
    collection = makeSearch(collection, req.query.search);
    collection = makeSorter(collection, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/photos/:id/show/self', async (req, res) => {
    const collection = photosDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });

  app.get('/posts/index/self', async (req, res) => {
    let collection = lodash.cloneDeep(postsDB.data);
    collection = makeSearch(collection, req.query.search);
    collection = makeSorter(collection, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/posts/:id/show/self', async (req, res) => {
    const collection = postsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });

  app.get('/comments/index/self', async (req, res) => {
    let collection = lodash.cloneDeep(commentsDB.data);
    collection = makeSearch(collection, req.query.search);
    collection = makeSorter(collection, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/comments/:id/show/self', async (req, res) => {
    const collection = commentsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });

  app.get('/todos/index/self', async (req, res) => {
    let collection = lodash.cloneDeep(todosDB.data);
    collection = makeSearch(collection, req.query.search);
    collection = makeSorter(collection, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/todos/:id/show/self', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/todos/new/self', async (_req, res) => {
    const model = { userId: '', title: '', completed: false };
    res.send(buildSuccessResponse({ model }));
  });
  app.put('/todos/new/self', async (req, res) => {
    const collection = todosDB.data;
    const model = { ...req.body.model, id: collection.length + 1 };
    collection.push(model);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/todos/:id/edit/self', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });
  app.put('/todos/:id/edit/self', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    Object.assign(model, { ...req.body.model });
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/todos/:id/delete/self', async (req, res) => {
    const collection = todosDB.data;
    const index = collection.findIndex((item) => item.id == req.params.id);
    collection.splice(index, 1);
    res.send(buildSuccessResponse({ model: {} }));
  });
  app.put('/todos/:id/delete/self', async (_req, res) => {
    res.send(buildSuccessResponse({ model: {} }));
  });

  app.get('/administrators/index/self', async (req, res) => {
    let collection = lodash.cloneDeep(administratorsDB.data);
    collection = makeSearch(collection, req.query.search);
    collection = makeSorter(collection, req.query.sorter);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/administrators/:id/show/self', async (req, res) => {
    const collection = administratorsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/administrators/new/self', async (_req, res) => {
    const model = { name: '', role: 'user' };
    res.send(buildSuccessResponse({ model }));
  });
  app.put('/administrators/new/self', async (req, res) => {
    const collection = administratorsDB.data;
    const model = { ...req.body.model, id: collection.length + 1 };
    collection.push(model);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/administrators/:id/edit/self', async (req, res) => {
    const collection = administratorsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });
  app.put('/administrators/:id/edit/self', async (req, res) => {
    const collection = administratorsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    Object.assign(model, { ...req.body.model });
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/administrators/:id/delete/self', async (req, res) => {
    const collection = administratorsDB.data;
    const index = collection.findIndex((item) => item.id == req.params.id);
    collection.splice(index, 1);
    res.send(buildSuccessResponse({ model: {} }));
  });
  app.put('/administrators/:id/delete/self', async (_req, res) => {
    res.send(buildSuccessResponse({ model: {} }));
  });
}
