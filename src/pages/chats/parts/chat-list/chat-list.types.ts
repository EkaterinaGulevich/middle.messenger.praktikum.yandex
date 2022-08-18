import { TChatItem } from 'src/types';
import { ChatListItemComponent } from 'src/pages/chats/parts';

export type TChatListTmpProps = {
  chatListItemComponents: string[];
};

export type TChatListComponentState = {
  chats: TChatItem[];
  chatFilter?: string;
};

export type TChatListComponentCallbacks = {
  onChatClick?: (_event: Event, _component: ChatListItemComponent) => void;
};
