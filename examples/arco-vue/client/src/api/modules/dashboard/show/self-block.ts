// This file declares the request interface for the Vue component defined in
// file @/views/modules/dashboard/show/components/self-block.vue. Feel free to edit it.

import axios from 'axios';

/* GET /dashboard/show/self */
export interface GetResponse {
}
export function get(id: string) {
  return axios.get<GetResponse>(`/dashboard/show/self`);
}
