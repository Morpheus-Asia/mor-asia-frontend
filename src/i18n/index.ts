import en from "./en.json";
import cn from "./cn.json";
const dictionaries: any = {
  en,
  cn,
};

export const getDictionary = (locale: any): any => dictionaries[locale];
