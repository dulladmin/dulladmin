import axios from 'axios';

/* Model */
export interface Model {
  id: string;
  title: string;
  completed: boolean;
}

/* GET /todos/index/self */
export interface ListResponse {
  collection: Model[];
}
export function list() {
  return axios.get<ListResponse>('/todos/index/self');
}
