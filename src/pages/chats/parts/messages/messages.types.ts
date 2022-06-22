import { TMessageGroupByDateTmpProps } from '../message-group-by-date/message-group-by-date.types';

export type TMessagesTmpProps = {
  isNotSelectedChat: boolean;
  messageGroupsId: string;
  isLoading: boolean;
  textareaId: string;
};

export type TMessagesComponentState = {
  isLoading?: boolean;
  selectedChat: null | number;
  messageGroups: TMessageGroupByDateTmpProps[];
  listMessages: any[]
};
