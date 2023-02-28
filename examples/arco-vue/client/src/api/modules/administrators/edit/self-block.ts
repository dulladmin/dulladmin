/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* FormModel */
export interface FormModel {
  name?: string;
  role?: string;
}

/* GET /administrators/${id}/edit/self */
export interface GetResponse {
  form: FormModel;
}
export function get(id: string) {
  return axios.get<GetResponse>(`/administrators/${id}/edit/self`);
}

/* PUT /administrators/${id}/edit/self */
export interface UpdateRequest {
  form: FormModel;
}
export interface UpdateResponse {
  form: FormModel;
}
export function update(id: string, req: UpdateRequest) {
  return axios.put<UpdateResponse>(`/administrators/${id}/edit/self`, req);
}