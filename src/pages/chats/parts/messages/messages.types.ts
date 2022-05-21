import { TMessageGroupByDateTmpProps } from '../message-group-by-date/message-group-by-date.types';

export type TMessagesTmpProps = {
  isNotSelectedChat: boolean;
  messageGroupsId: string;
  isLoading: boolean;
};

export type TMessagesComponentState = {
  isLoading?: boolean;
  selectedChat: null | string;
  messageGroups: TMessageGroupByDateTmpProps[];
};
