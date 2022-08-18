import { TUserResponse } from 'src/types';

export type TStore = {
  currentUser?: null | TUserResponse;
  chatsData?: {
    [chatId: number]: {
      users: TUserResponse[];
    };
  };
  chatFilter?: string;
};
