import axios from './axios';
import {to} from './to';

export async function getAllTags() {
  const response = axios.get('tags/list');

  return await to(response);
}
