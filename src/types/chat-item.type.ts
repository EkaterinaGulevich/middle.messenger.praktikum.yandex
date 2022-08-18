import { TChatResponse } from 'src/types/api-types';

export type TChatItem = TChatResponse & {
  isFromMe: boolean;
  individualChatName: string;
  individualChatAvatar: string;
};
