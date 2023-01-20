/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* Model */
export interface Model {
  userId: string;
  id: string;
  title: string;
  body: string;
}

/* GET /posts/index/self */
export interface ListResponse {
  collection: Model[];
}
export function list() {
  return axios.get<ListResponse>(`/posts/index/self`);
}
