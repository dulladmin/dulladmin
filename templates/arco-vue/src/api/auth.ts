import axios from 'axios';

export interface CreateRequestForm {
  username: string;
  password: string;
}

export interface CreateRequest {
  form: CreateRequestForm;
}

interface CreateResponseUserInfo {
  name: string;
}

interface CreateResponse {
  token: string;
  info: CreateResponseUserInfo;
}

export function create(req: CreateRequest) {
  return axios.post<CreateResponse>('/auth', req);
}

export function destroy() {
  return axios.delete('/auth');
}
