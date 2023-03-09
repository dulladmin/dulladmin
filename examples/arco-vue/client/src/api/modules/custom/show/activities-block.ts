// This file declares the request interface for the Vue component defined in
// file @/views/modules/custom/show/components/activities-block.vue. Feel free to edit it.

import axios from 'axios';

/* GET /custom/show/activities */
export interface GetResponse {
}
export function get(id: string) {
  return axios.get<GetResponse>(`/custom/show/activities`);
}
