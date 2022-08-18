import { TJsonObject } from 'src/types';

export type TRequestOptions = {
  timeout?: number;
  headers?: { [name: string]: string };
  data?: TJsonObject | File;
};
