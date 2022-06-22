import { TResChat } from '../common-types'

export enum StoreEvents {
  Updated = 'updated',
}

export type TStore = {
  userId?: number;
  listMessages?: any
  chats: TResChat[]
}
