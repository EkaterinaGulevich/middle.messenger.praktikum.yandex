export type TChatResponseBackend = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type TChatResponse = {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: null | {
    user: {
      firstName: string;
      secondName: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};
