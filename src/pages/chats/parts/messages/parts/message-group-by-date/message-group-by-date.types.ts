import { TMessageResponse } from 'src/types';

export type TMessageGroupByDateTmpProps = {
  date: string;
  messages: TMessageResponse[];
};

export type TMessageGroupByDateComponentState = TMessageGroupByDateTmpProps;
