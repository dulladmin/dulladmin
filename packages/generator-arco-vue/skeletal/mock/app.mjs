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
}
