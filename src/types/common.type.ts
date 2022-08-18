export type TJsonValue = string | number | boolean | null | undefined | TJsonValue[] | { [key: string]: TJsonValue };

export type TJsonObject = { [key: string]: TJsonValue };

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : '';

export type TypeFromPath<T extends TJsonObject, Path extends string> = {
  [K in Path]: K extends keyof T
    ? T[K]
    : K extends `${infer P}.${infer S}`
    ? T[P] extends TJsonObject
      ? TypeFromPath<T[P], S>
      : never
    : never;
}[Path];
