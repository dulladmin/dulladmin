import axios from 'axios';

/* Model */
export interface Model {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/* GET /users/index/self */
export interface ListResponse {
  collection: Model[];
}
export function list() {
  return axios.get<ListResponse>('/users/index/self');
}
