import { TMessageTmpProps } from '../../../../components/message/message.types';

export type TMessageGroupByDateTmpProps = {
  date: string;
  messages: TMessageTmpProps[];
};

export type TMessageGroupByDateComponentState = TMessageGroupByDateTmpProps;
