// This file declares the request interface for the Vue component defined in
// file @/views/modules/custom/show/components/notifications-block.vue. Feel free to edit it.

import axios from 'axios';

/* GET /custom/show/notifications */
export interface GetResponse {
}
export function get(id: string) {
  return axios.get<GetResponse>(`/custom/show/notifications`);
}
