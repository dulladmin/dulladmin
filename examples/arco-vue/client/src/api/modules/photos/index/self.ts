/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';
import {
  Sorter,
  Pagination,
} from '@/api/common';

/* Model */
export interface Model {
  id?: string;
  albumId?: string;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}


/* GET /photos/index/self */
export interface ListRequest {
  sorter?: Sorter;
  pagination: Pagination;
}
export interface ListResponse {
  collection: Model[];
  pagination?: Pagination;
}
export function list(id: string, req: ListRequest) {
  return axios.get<ListResponse>(`/photos/index/self`, { params: req });
}
