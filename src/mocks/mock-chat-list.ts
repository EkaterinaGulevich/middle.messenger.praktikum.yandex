import { TChatListItemTmpProps } from 'src/pages/chats/parts/chat-list-item/chat-list-item.types';

export const MOCK_CHAT_LIST: TChatListItemTmpProps[] = [
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
  {
    id: 'id-chat-4',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Somebody',
    },
    lastMessage: {
      text: '',
      time: '',
    },
  },
  {
    id: 'id-chat-5',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Somebody 2',
    },
    lastMessage: {
      text: '',
      time: '',
    },
  },
  {
    id: 'id-chat-6',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Somebody 3',
    },
    lastMessage: {
      text: '',
      time: '',
    },
  },
  {
    id: 'id-chat-7',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Somebody 4',
    },
    lastMessage: {
      text: '',
      time: '',
    },
  },
  {
    id: 'id-chat-8',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Somebody 5',
    },
    lastMessage: {
      text: '',
      time: '',
    },
  },
  {
    id: 'id-chat-9',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Somebody 6',
    },
    lastMessage: {
      text: '',
      time: '',
    },
  },
  {
    id: 'id-chat-10',
    companion: {
      avatarSrc: 'avatarSrc',
      name: 'Somebody 7',
    },
    lastMessage: {
      text: '',
      time: '',
    },
  },
];
