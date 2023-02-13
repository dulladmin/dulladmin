/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';
import {
  Pagination,
} from '@/api/common';

/* Model */
export interface Model {
  id?: string;
  name?: string;
  role?: string;
}

/* Search */
interface Search {
  id_eq?: string;
  role_eq?: string;
}

/* GET /administrators/index/self */
export interface ListRequest {
  search?: Search;
  pagination: Pagination;
}
export interface ListResponse {
  collection: Model[];
  pagination?: Pagination;
}
export function list(id: string, req: ListRequest) {
  return axios.get<ListResponse>(`/administrators/index/self`, { params: req });
}
