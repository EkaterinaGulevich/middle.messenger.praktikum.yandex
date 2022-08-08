export type TMessageResponseBackend = {
  chat_id: number;
  content: string;
  file: any; // TODO: описать тип, когда будет использоваться
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
  isFromMe: boolean;
};

export type TMessageResponse = {
  chatId: number;
  content: string;
  id: number;
  isRead: boolean;
  time: string;
  type: string;
  userId: number;
  isFromMe: boolean;
};

export type TNewMessageResponseBackend = {
  content: string;
  type: string;
  time: string;
  user_id: number;
  id: number;
};

export type TNewMessageResponse = {
  content: string;
  type: string;
  time: string;
  userId: number;
  id: number;
  isFromMe: boolean;
};
