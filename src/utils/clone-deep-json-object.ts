import { TJsonObject } from '../common-types';

export const cloneDeepJsonObject = <T extends TJsonObject>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
