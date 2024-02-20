import { reduce } from "lodash";

export const add = (a: number, b: number): number => a + b;

export const sum = (xs: number[]) => reduce(xs, add, 0);
