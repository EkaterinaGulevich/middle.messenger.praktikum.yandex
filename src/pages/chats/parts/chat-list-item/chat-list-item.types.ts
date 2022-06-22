import { Component } from 'src/modules';

export type TChatListItemTmpProps = {
  // id: string;
  // companion: {
  //   avatarSrc: string;
  //   name: string;
  // };
  // lastMessage: {
  //   fromMe?: boolean;
  //   text: string;
  //   time: string;
  // };
  // unreadMessagesCount?: number;

  isActive?: boolean;
  className?: string;
  date?: string;
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string | null;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  } | null;
};

export type TChatListItemComponentCallbacks = {
  onclick: (_event: Event, _component: Component<TChatListItemTmpProps>) => void;
};

export type TChatListItemComponentState = TChatListItemTmpProps;
