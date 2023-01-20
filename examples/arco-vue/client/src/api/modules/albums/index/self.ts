import axios from 'axios';

/* Model */
export interface Model {
  id: string;
  title: string;
}

/* GET /albums/index/self */
export interface ListResponse {
  collection: Model[];
}
export function list() {
  return axios.get<ListResponse>('/albums/index/self');
}
