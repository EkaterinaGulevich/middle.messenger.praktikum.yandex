import { Component } from 'src/modules';

export type TChatListItemTmpProps = {
  id: string;
  companion: {
    avatarSrc: string;
    name: string;
  };
  lastMessage: {
    fromMe?: boolean;
    text: string;
    time: string;
  };
  unreadMessagesCount?: number;
  isActive?: boolean;
  className?: string;
};

export type TChatListItemComponentCallbacks = {
  onclick: (_event: Event, _component: Component<TChatListItemTmpProps>) => void;
};

export type TChatListItemComponentProps = {
  initialState: TChatListItemTmpProps;
  callbacks: TChatListItemComponentCallbacks;
};
