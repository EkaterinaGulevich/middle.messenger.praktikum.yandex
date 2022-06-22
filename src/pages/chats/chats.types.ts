import { TChatListItemTmpProps } from './parts'

export type TChatsTmpProps = {
  listId: string;
  messagesId: string;
  chatsHeaderId: string;
  isLoading: boolean;
};

export type TChatsComponentState = {
  isLoading?: boolean;
  chats: TChatListItemTmpProps[]
};
