/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* FormModel */
export interface FormModel {
}

/* GET /todos/index/self/${subid}/create-completed */
export interface GetResponse {
  form: FormModel;
}
export function get(id: string, subid: string) {
  return axios.get<GetResponse>(`/todos/index/self/${subid}/create-completed`);
}

/* PUT /todos/index/self/${subid}/create-completed */
export interface UpdateRequest {
  form: FormModel;
}
export interface UpdateResponse {
  form: FormModel;
  model?: any;
}
export function update(id: string, subid: string, req: UpdateRequest) {
  return axios.put<UpdateResponse>(`/todos/index/self/${subid}/create-completed`, req);
}