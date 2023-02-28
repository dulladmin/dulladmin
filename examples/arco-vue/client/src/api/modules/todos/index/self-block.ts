/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';
import {
  Sorter,
  Pagination,
} from '@/api/common';

/* Model */
export interface Model {
  id?: number;
  userId?: number;
  title?: string;
  completed?: boolean;
}

/* Search */
interface Search {
  userId_eq?: number;
  completed_eq?: boolean;
}

/* GET /todos/index/self */
export interface ListRequest {
  search?: Search;
  sorter?: Sorter;
  pagination: Pagination;
}
export interface ListResponse {
  collection: Model[];
  pagination?: Pagination;
}
export function list(id: string, req: ListRequest) {
  return axios.get<ListResponse>(`/todos/index/self`, { params: req });
}