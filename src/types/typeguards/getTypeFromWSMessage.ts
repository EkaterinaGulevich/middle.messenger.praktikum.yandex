import { TMessageResponse, TNewMessageResponse } from 'src/types';

export const isDataMessageResponse = (data: TNewMessageResponse | TMessageResponse[]): data is TMessageResponse[] =>
  Array.isArray(data);
