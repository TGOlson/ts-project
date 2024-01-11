import res from "../data/res.json";

export type JSONData = typeof res['data'];

export const loadData = (): JSONData => {
  return res.data;
};
