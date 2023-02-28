/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* FormModel */
export interface FormModel {
}

/* GET /todos/${id}/delete/self */
export interface GetResponse {
  form: FormModel;
}
export function get(id: string) {
  return axios.get<GetResponse>(`/todos/${id}/delete/self`);
}

/* PUT /todos/${id}/delete/self */
export interface UpdateRequest {
  form: FormModel;
}
export interface UpdateResponse {
  form: FormModel;
}
export function update(id: string, req: UpdateRequest) {
  return axios.put<UpdateResponse>(`/todos/${id}/delete/self`, req);
}