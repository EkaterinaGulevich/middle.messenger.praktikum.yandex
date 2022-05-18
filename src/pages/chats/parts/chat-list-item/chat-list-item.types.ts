export type ChatListItemProps = {
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
