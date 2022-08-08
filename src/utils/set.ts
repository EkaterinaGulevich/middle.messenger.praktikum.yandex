import { TJsonObject, TJsonValue } from 'src/types';
import { merge } from 'src/utils';

export const set = (object: TJsonObject, path: string, value: TJsonValue): TJsonObject => {
  const result = path.split('.').reduceRight(
    (acc, key): TJsonObject => ({
      [key]: acc,
    }),
    value
  );

  return merge(object, result as TJsonObject);
};
