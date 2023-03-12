import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

let uuid_ = 1_000_000;
export const uuid = () => ++uuid_;

export async function loadDatabase(filename) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filepath = join(__dirname, filename);
  const adapter = new JSONFile(filepath);
  const db = new Low(adapter);
  await db.read();
  return db;
}

export function makePagination(collection, pagination) {
  const page_size = parseInt(pagination.page_size);
  const current = parseInt(pagination.current);
  const total = collection.length;
  collection = collection.slice((current - 1) * page_size, current * page_size);
  pagination = { page_size, current, total };
  return { collection, pagination };
}

export function makeSearch(collection, search) {
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

export function makeSorter(collection, sorter) {
  if (sorter == null) return collection;
  return collection.sort((a, b) => {
    if (sorter.direction === 'ascend') {
      return a[sorter.name] > b[sorter.name] ? 1 : -1;
    } else {
      return a[sorter.name] < b[sorter.name] ? 1 : -1;
    }
  });
}

export function buildSuccessResponse(data) {
  return { code: 0, msg: 'ok', data: data || {} };
}

export function buildFailureResponse(msg, data) {
  return { code: 1, msg, data: data || {} };
}
