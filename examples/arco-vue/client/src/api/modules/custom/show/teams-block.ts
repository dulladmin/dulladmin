// This file declares the request interface for the Vue component defined in
// file @/views/modules/custom/show/components/teams-block.vue. Feel free to edit it.

import axios from 'axios';

/* GET /custom/show/teams */
export interface GetResponse {
}
export function get(id: string) {
  return axios.get<GetResponse>(`/custom/show/teams`);
}
