/* Code generated by DullAdmin; DO NOT EDIT. */

import axios from 'axios';
import { EChartsOption } from 'echarts';

/* ChartModel */
export interface ChartModel extends EChartsOption {
};

/* GET /charts/index/pie-rich-text */
export interface GetResponse {
  chart: ChartModel;
}
export function get(id: string) {
  return axios.get<GetResponse>(`/charts/index/pie-rich-text`);
}
