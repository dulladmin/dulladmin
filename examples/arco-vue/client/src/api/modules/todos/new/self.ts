/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* Model */
export interface Model {
  userId?: string;
  title?: string;
  completed?: boolean;
}

/* GET /todos/new/self */
export interface GetResponse {
  model: Model;
}
export function get(id: string) {
  return axios.get<GetResponse>(`/todos/new/self`);
}

/* PUT /todos/new/self */
export interface UpdateRequest {
  model: Model;
}
export interface UpdateResponse {
  model: Model;
}
export function update(id: string, req: UpdateRequest) {
  return axios.put<UpdateResponse>(`/todos/new/self`, req);
}