import lodash from 'lodash';
import {
  uuid,
  loadDatabase,
  makePagination,
  makeSearch,
  makeSorter,
  buildSuccessResponse,
} from './utils.mjs';

export async function enhance(app) {
  const usersDB = await loadDatabase('./db/users.json');
  const dashboardDB = await loadDatabase('./db/dashboard.json');
  const albumsDB = await loadDatabase('./db/albums.json');
  const photosDB = await loadDatabase('./db/photos.json');
  const postsDB = await loadDatabase('./db/posts.json');
  const commentsDB = await loadDatabase('./db/comments.json');
  const todosDB = await loadDatabase('./db/todos.json');
  const administratorsDB = await loadDatabase('./db/administrators.json');
  const tablesDB = await loadDatabase('./db/tables.json');
  const descriptionsDB = await loadDatabase('./db/descriptions.json');
  const chartsDB = await loadDatabase('./db/charts.json');
  const customDB = await loadDatabase('./db/custom.json');

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
  app.get('/users/new/self', async (_req, res) => {
    const model = {
      name: '',
      username: '',
      avatar: '',
      email: '',
      phone: '',
      website: '',
    };
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/users/new/self', async (req, res) => {
    const collection = usersDB.data;
    const model = { ...req.body.form, id: uuid() };
    collection.push(model);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.get('/users/:id/edit/self', async (req, res) => {
    const collection = usersDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/users/:id/edit/self', async (req, res) => {
    const collection = usersDB.data;
    const model = collection.find((item) => item.id == req.params.id);
    Object.assign(model, { ...req.body.form, id: model.id });
    res.send(buildSuccessResponse({ form: model }));
  });
  app.put('/users/:id/delete/self', async (req, res) => {
    const collection = usersDB.data;
    const index = collection.findIndex((item) => item.id == req.params.id);
    collection.splice(index, 1);
    res.send(buildSuccessResponse({ form: {} }));
  });

  app.get('/dashboard/show/publish', async (_req, res) => {
    const chart = dashboardDB.data['publish'];
    res.send(buildSuccessResponse({ chart }));
  });
  app.get('/dashboard/show/authors', async (_req, res) => {
    const collection = dashboardDB.data['authors'];
    res.send(buildSuccessResponse({ collection }));
  });
  app.get('/dashboard/show/period', async (_req, res) => {
    const chart = dashboardDB.data['period'];
    res.send(buildSuccessResponse({ chart }));
  });
  app.get('/dashboard/show/content-source', async (_req, res) => {
    const chart = dashboardDB.data['content-source'];
    res.send(buildSuccessResponse({ chart }));
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
      id: uuid(),
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
      id: uuid(),
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
    const model = { ...req.body.form, id: uuid() };
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
    const model = { ...req.body.form, id: uuid() };
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

  app.get('/tables/index/:blkName', async (req, res) => {
    const collection = tablesDB.data[req.params.blkName];
    res.send(buildSuccessResponse({ collection }));
  });

  app.get('/descriptions/index/:blkName', async (req, res) => {
    const model = descriptionsDB.data[req.params.blkName];
    res.send(buildSuccessResponse({ model }));
  });

  app.get('/charts/index/:chart', async (req, res) => {
    const chart = chartsDB.data[req.params.chart];
    res.send(buildSuccessResponse({ chart }));
  });

  app.get('/custom/show/:blkName', async (req, res) => {
    res.send(
      buildSuccessResponse({
        [req.params.blkName]: customDB.data[req.params.blkName],
      })
    );
  });
}
