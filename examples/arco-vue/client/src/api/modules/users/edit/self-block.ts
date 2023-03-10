/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* FormModel */
export interface FormModel {
  name?: string;
  username?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  website?: string;
}

/* GET /users/${id}/edit/self */
export interface GetResponse {
  form: FormModel;
}
export function get(id: string) {
  return axios.get<GetResponse>(`/users/${id}/edit/self`);
}

/* PUT /users/${id}/edit/self */
export interface UpdateRequest {
  form: FormModel;
}
export interface UpdateResponse {
  form: FormModel;
}
export function update(id: string, req: UpdateRequest) {
  return axios.put<UpdateResponse>(`/users/${id}/edit/self`, req);
}
