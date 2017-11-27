import { stringify } from 'qs';
import request from '../utils/request';

export async function queryExample(params) {
  return request(`/api/example?${stringify(params)}`);
}
