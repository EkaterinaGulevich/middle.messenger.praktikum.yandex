import { cloneDeepJsonObject } from '../utils/clone-deep-json-object';
import { TJsonValue, TJsonObject } from '../common-types';

const isPrivateProp = (prop: string) => prop.startsWith('_');

const throwPrivatePropError = (prop: string) => {
  throw new Error(`Нет прав доступа к ${prop}`);
};

type TMakePropsProxyProps<T extends TJsonObject> = {
  props: T;
  /** Если true, нельзя удалять ни одно свойство, если false - только приватные */
  canDeleteProperty: boolean;
  /** Колбэк при изменении props */
  callbackOnSet: (_oldProps: T, _newProps: T) => void;
};

export const makePropsProxy = <T extends TJsonObject>({
  props,
  canDeleteProperty,
  callbackOnSet,
}: TMakePropsProxyProps<T>): T => {
  return new Proxy<T>(props, {
    get(target, prop: string) {
      if (isPrivateProp(prop)) {
        throwPrivatePropError(prop);
      }

      /** TODO:
       * Когда будут нужны функции и будет cloneDeep еще и для функций
       * (а не только для объектов типа {@link TJsonObject}),
       * переопределить тип props и поправить возвращаемое значение на:
       *
       * const value = target[prop];
       * return typeof value === 'function' ? value.bind(target) : value;
       */

      return target[prop];
    },

    set(_target, prop: string, value: TJsonValue): boolean {
      if (isPrivateProp(prop)) {
        throwPrivatePropError(prop);
      }
      const oldTarget = cloneDeepJsonObject(_target);

      // TODO: понять как избавиться от "as"
      (_target as TJsonObject)[prop] = value;
      callbackOnSet(oldTarget, _target);

      return true;
    },

    deleteProperty(_target, prop: string): boolean {
      if (!canDeleteProperty) {
        throw new Error(`Нет прав удаления ${prop}`);
      }
      if (isPrivateProp(prop)) {
        throwPrivatePropError(prop);
      }
      delete _target[prop];
      return true;
    },
  });
};
