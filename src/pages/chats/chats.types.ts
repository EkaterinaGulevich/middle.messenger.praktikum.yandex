import { TChatListItemTmpProps } from './parts/chat-list-item/chat-list-item.types';

export type TChatsTmpProps = {
  listId: string;
  messagesId: string;
  isLoading: boolean;
};

export type TChatsComponentProps = {
  initialState: {
    isLoading: boolean;
    list: TChatListItemTmpProps[];
  };
};
