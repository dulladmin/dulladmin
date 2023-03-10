/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* FormModel */
export interface FormModel {
  title?: string;
}

/* GET /albums/${id}/show/photos/new */
export interface GetResponse {
  form: FormModel;
}
export function get(id: string, subid: string) {
  return axios.get<GetResponse>(`/albums/${id}/show/photos/new`);
}

/* PUT /albums/${id}/show/photos/new */
export interface UpdateRequest {
  form: FormModel;
}
export interface UpdateResponse {
  form: FormModel;
  model?: any;
}
export function update(id: string, subid: string, req: UpdateRequest) {
  return axios.put<UpdateResponse>(`/albums/${id}/show/photos/new`, req);
}
