import { reduce } from "ramda";

export const add = (a: number, b: number): number => a + b;

export const sum = reduce(add, 0);
