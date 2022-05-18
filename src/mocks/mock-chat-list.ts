import { ChatListItemProps } from '../pages/chats/parts/chat-list-item/chat-list-item.types';

export const MOCK_CHAT_LIST: ChatListItemProps[] = [
  {
    id: 'id-chat-1',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Илья',
    },
    lastMessage: {
      fromMe: true,
      text: 'Друзья, у меня для вас особенный выпуск Друзья, у меня для вас особенный выпуск Друзья, у меня для вас',
      time: '7 апреля 2022',
    },
    unreadMessagesCount: 4,
    isActive: false,
  },
  {
    id: 'id-chat-2',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Илья Длиииииннныыыыйййййййййййййййй',
    },
    lastMessage: {
      fromMe: false,
      text: 'Друзья',
      time: '10:55',
    },
    unreadMessagesCount: 465454,
  },
  {
    id: 'id-chat-3',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Илья Длиииииннныыыыйййййййййййййййй',
    },
    lastMessage: {
      fromMe: true,
      text: 'Друзья',
      time: '10:55',
    },
    unreadMessagesCount: 0,
  },
];
