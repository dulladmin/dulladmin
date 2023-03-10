/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';

/* Model */
export interface Model {
  double_arr?: number[];
  int64_arr?: number[];
  string_arr?: string[];
  datetime_arr?: string[];
  image_arr?: string[];
  string_optionals_arr?: string[];
}

/* GET /descriptions/index/scalar-array */
export interface GetResponse {
  model: Model;
}
export function get(id: string) {
  return axios.get<GetResponse>(`/descriptions/index/scalar-array`);
}
