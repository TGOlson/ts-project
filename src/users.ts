import { readFileSync } from 'fs';
import {resolve} from 'path';

export const USER_1_PATH = resolve(__dirname, '../data/user1.json');
export const USER_2_PATH = resolve(__dirname, '../data/user2.json');

export async function readJSON<T> (path: string) {
  const blob = readFileSync(path, 'utf8');
  // writeFile
  return JSON.parse(blob) as T;
}
