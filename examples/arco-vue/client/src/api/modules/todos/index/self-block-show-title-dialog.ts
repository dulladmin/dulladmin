/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* Model */
export interface Model {
  title?: string;
}

/* GET /todos/index/self/${subid}/show-title */
export interface GetResponse {
  model: Model;
}
export function get(id: string, subid: string) {
  return axios.get<GetResponse>(`/todos/index/self/${subid}/show-title`);
}