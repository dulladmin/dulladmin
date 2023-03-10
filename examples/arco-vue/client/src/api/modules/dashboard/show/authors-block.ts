/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';
import {
  Pagination,
} from '@/api/common';

/* Model */
export interface Model {
  id?: number;
  rank?: number;
  name?: string;
  clickNumber?: number;
}

/* GET /dashboard/show/authors */
export interface ListRequest {
  pagination: Pagination;
}
export interface ListResponse {
  collection: Model[];
  pagination?: Pagination;
}
export function list(id: string, req: ListRequest) {
  return axios.get<ListResponse>(`/dashboard/show/authors`, { params: req });
}
