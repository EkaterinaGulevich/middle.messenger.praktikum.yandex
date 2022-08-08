import { ChatListItemComponent } from 'src/pages/chats/parts';
import { TChatItem } from 'src/types/chat-item.type';

export type TChatListItemTmpProps = TChatItem & {
  isActive?: boolean;
  className?: string;
  date?: string;
};

export type TChatListItemComponentState = TChatListItemTmpProps;

export type TChatListItemComponentCallbacks = {
  onclick: (_event: Event, _component: ChatListItemComponent) => void;
};
