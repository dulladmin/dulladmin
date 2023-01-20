import axios from 'axios';

/* Model */
export interface Model {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

/* GET /photos/index/self */
export interface ListResponse {
  collection: Model[];
}
export function list() {
  return axios.get<ListResponse>('/photos/index/self');
}
