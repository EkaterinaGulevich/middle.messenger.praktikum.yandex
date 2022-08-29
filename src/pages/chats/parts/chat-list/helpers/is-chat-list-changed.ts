import { TChatItem } from 'src/types';

export const isChatListChanged = (prevChats: TChatItem[], nextChats: TChatItem[]): boolean => {
  if (prevChats.length !== nextChats.length) {
    return true;
  }

  const isDataDifferent = prevChats.some((prevChat, i) => {
    const prevComparedData = {
      id: prevChat.id,
      time: prevChat.lastMessage?.time,
      content: prevChat.lastMessage?.content,
      isFromMe: prevChat.isFromMe,
      unreadCount: prevChat.unreadCount,
    };

    const nextComparedData = {
      id: nextChats[i].id,
      time: nextChats[i].lastMessage?.time,
      content: nextChats[i].lastMessage?.content,
      isFromMe: nextChats[i].isFromMe,
      unreadCount: nextChats[i].unreadCount,
    };

    return JSON.stringify(prevComparedData) !== JSON.stringify(nextComparedData);
  });

  return isDataDifferent;
};
