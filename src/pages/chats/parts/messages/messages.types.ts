import { TGroupOfMessage } from 'src/types';

export type TMessagesTmpProps = {
  isSelectedChat: boolean;
  isLoading: boolean;
  clipButton: string;
  sendButton: string;
  messageGroups: string[];
  messageGroupsWrapperId: string;
  messageGroupsWrapperModifiers: string;
  messageTextarea: string;
  companion?: {
    name: string;
    avatar: string;
  };
};

export type TMessagesComponentState = {
  isLoading: boolean;
  selectedChatId: null | number;
  groupsOfMessages: TGroupOfMessage[];
  companion?: {
    name: string;
    avatar: string;
  };
};
