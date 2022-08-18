import { EventBus } from 'src//modules';
import { set } from 'src/utils';
import { STORE_ITEM } from 'src/consts/local-storage-keys';

import { TStore } from './store.types';
import { Paths, TypeFromPath } from 'src/types';

const INITIAL_STATE: TStore = {
  currentUser: null,
  chatsData: {},
  chatFilter: '',
};

export class Store extends EventBus {
  state: TStore;

  constructor() {
    super();

    const cachedStore = localStorage.getItem(STORE_ITEM);

    this.state = cachedStore ? JSON.parse(cachedStore) : INITIAL_STATE;
  }

  public getState(): TStore {
    return this.state;
  }

  static EVENTS = {
    UPDATE: 'store-updated',
  };

  public set<T extends Paths<TStore>>(path: T, value: TypeFromPath<TStore, T>) {
    set(this.state, path, value);

    localStorage.setItem(STORE_ITEM, JSON.stringify(this.getState()));
    this.emit(Store.EVENTS.UPDATE, this.getState());
  }
}

export const store = new Store();
