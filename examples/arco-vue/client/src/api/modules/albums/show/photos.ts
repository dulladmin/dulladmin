/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';
import {
  Pagination,
} from '@/api/common';

/* Model */
export interface Model {
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}


/* GET /albums/${id}/show/photos */
export interface ListRequest {
  pagination: Pagination;
}
export interface ListResponse {
  collection: Model[];
  pagination?: Pagination;
}
export function list(id: string, req: ListRequest) {
  return axios.get<ListResponse>(`/albums/${id}/show/photos`, { params: req });
}
