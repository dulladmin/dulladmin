import axios from 'axios';

/* Model */
export interface Model {
  id: string;
  name: string;
  email: string;
  body: string;
}

/* GET /comments/index/self */
export interface ListResponse {
  collection: Model[];
}
export function list() {
  return axios.get<ListResponse>('/comments/index/self');
}
