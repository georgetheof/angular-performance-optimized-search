import { Classification } from '../models';

export const VARIANT_CLASSIFICATION_OPTIONS: {
  id: string;
  value: Classification;
}[] = Object.keys(Classification)
  .filter((key) => Number.isNaN(Number(key)))
  .map((value: any) => ({ id: Classification[value], value }));
