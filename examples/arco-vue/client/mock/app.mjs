import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import lodash from 'lodash';
import { buildSuccessResponse } from './utils.mjs';

let id = 10000;
function generateID() {
  return id++;
}

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
  app.get('/albums/:id/show/photos/new', async (_req, res) => {
    const model = { title: '' };
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/albums/:id/show/photos/new', async (req, res) => {
    const collection = photosDB.data;
    const model = {
      ...req.body.form,
      id: generateID(),
      albumId: req.params.id,
    };
    collection.push(model);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/albums/:id/show/photos/:subid/show', async (req, res) => {
    const collection = photosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/albums/:id/show/photos/:subid/edit', async (req, res) => {
    const collection = photosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/albums/:id/show/photos/:subid/edit', async (req, res) => {
    const collection = photosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    Object.assign(model, { ...req.body.form });
    res.send(buildSuccessResponse({ form: model, model: model }));
  });
  app.get('/albums/:id/show/photos/:subid/delete', async (_req, res) => {
    res.send(buildSuccessResponse({ form: {} }));
  });
  app.put('/albums/:id/show/photos/:subid/delete', async (req, res) => {
    const collection = photosDB.data;
    const index = collection.findIndex((item) => item.id == req.params.subid);
    collection.splice(index, 1);
    res.send(buildSuccessResponse({ form: {} }));
  });
  app.get('/albums/:id/show-photos/self', async (req, res) => {
    let collection = photosDB.data;
    collection = collection.filter((item) => item.albumId == req.params.id);
    const r = makePagination(collection, req.query.pagination);
    res.send(buildSuccessResponse(r));
  });
  app.get('/albums/:id/show-photos/self/new', async (_req, res) => {
    const model = { title: '' };
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/albums/:id/show-photos/self/new', async (req, res) => {
    const collection = photosDB.data;
    const model = {
      ...req.body.form,
      id: generateID(),
      albumId: req.params.id,
    };
    collection.push(model);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/albums/:id/show-photos/self/:subid/show', async (req, res) => {
    const collection = photosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/albums/:id/show-photos/self/:subid/edit', async (req, res) => {
    const collection = photosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/albums/:id/show-photos/self/:subid/edit', async (req, res) => {
    const collection = photosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    Object.assign(model, { ...req.body.form });
    res.send(buildSuccessResponse({ form: model, model: model }));
  });
  app.get('/albums/:id/show-photos/self/:subid/delete', async (_req, res) => {
    res.send(buildSuccessResponse({ form: {} }));
  });
  app.put('/albums/:id/show-photos/self/:subid/delete', async (req, res) => {
    const collection = photosDB.data;
    const index = collection.findIndex((item) => item.id == req.params.subid);
    collection.splice(index, 1);
    res.send(buildSuccessResponse({ form: {} }));
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
  app.get('/todos/index/self/:subid/show-title', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/todos/index/self/:subid/edit-title', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/todos/index/self/:subid/edit-title', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    Object.assign(model, { ...req.body.form });
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/todos/index/self/:subid/create-completed', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    Object.assign(model, { completed: true });
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/todos/index/self/:subid/delete-completed', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.subid);
    Object.assign(model, { completed: false });
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/todos/:id/show/self', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ model }));
  });
  app.get('/todos/new/self', async (_req, res) => {
    const model = { userId: '', title: '', completed: false };
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/todos/new/self', async (req, res) => {
    const collection = todosDB.data;
    const model = { ...req.body.form, id: generateID() };
    collection.push(model);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/todos/:id/edit/self', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/todos/:id/edit/self', async (req, res) => {
    const collection = todosDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    Object.assign(model, { ...req.body.form });
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/todos/:id/delete/self', async (_req, res) => {
    res.send(buildSuccessResponse({ form: {} }));
  });
  app.put('/todos/:id/delete/self', async (req, res) => {
    const collection = todosDB.data;
    const index = collection.findIndex((item) => item.id == req.params.id);
    collection.splice(index, 1);
    res.send(buildSuccessResponse({ form: {} }));
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
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/administrators/new/self', async (req, res) => {
    const collection = administratorsDB.data;
    const model = { ...req.body.form, id: generateID() };
    collection.push(model);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/administrators/:id/edit/self', async (req, res) => {
    const collection = administratorsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/administrators/:id/edit/self', async (req, res) => {
    const collection = administratorsDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    Object.assign(model, { ...req.body.form });
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/administrators/:id/delete/self', async (_req, res) => {
    res.send(buildSuccessResponse({ form: {} }));
  });
  app.put('/administrators/:id/delete/self', async (req, res) => {
    const collection = administratorsDB.data;
    const index = collection.findIndex((item) => item.id == req.params.id);
    collection.splice(index, 1);
    res.send(buildSuccessResponse({ form: {} }));
  });

  app.get('/charts/index/basic-line', async (_req, res) => {
    const chart = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: { type: 'value' },
      series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
    };
    res.send(buildSuccessResponse({ chart }));
  });
  app.get('/charts/index/stacked-line', async (_req, res) => {
    const chart = {
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    res.send(buildSuccessResponse({ chart }));
  });
}
