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
  body?: string;
}


/* GET /posts/index/self */
export interface ListRequest {
  sorter?: Sorter;
  pagination: Pagination;
}
export interface ListResponse {
  collection: Model[];
  pagination?: Pagination;
}
export function list(id: string, req: ListRequest) {
  return axios.get<ListResponse>(`/posts/index/self`, { params: req });
}