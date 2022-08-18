import { ChatsApi } from 'src/api';
import {
  TMessageResponse,
  TNewMessageResponse,
  TChatItem,
  TNewMessageResponseBackend,
  TMessageResponseBackend,
  TUserResponse,
} from 'src/types';
import { AuthController, UserController } from 'src/controllers';
import { PRIVATE_CHAT_NAME, WS_URL } from 'src/consts/common';
import { store, TStore } from 'src/store';

export class Controller {
  async getChats(): Promise<TChatItem[]> {
    const authorizedUser = await AuthController.getUser();

    return ChatsApi.getChats({ limit: Number.MAX_SAFE_INTEGER }).then(async (chats) => {
      const getUsersFromChatsPromises: Promise<{ chatId: number; users: TUserResponse[] }>[] = [];
      chats.forEach((chat) => {
        const cachedChatData = store.getState().chatsData?.[chat.id];
        if (!cachedChatData) {
          getUsersFromChatsPromises.push(this.getChatUsers(chat.id));
        }
      });

      await Promise.all(getUsersFromChatsPromises).then((usersInChats) => {
        const chatsData: TStore['chatsData'] = {};
        usersInChats.forEach(({ chatId, users }) => {
          chatsData[chatId] = {
            users,
          };
        });

        store.set('chatsData', chatsData);
      });

      return chats.map((chat): TChatItem => {
        const cachedChatData = store.getState().chatsData?.[chat.id];

        const companion = cachedChatData?.users.find((user) => user.id !== authorizedUser.id);

        if (!companion) {
          return {
            ...chat,
            isFromMe: false,
            individualChatName: '',
            individualChatAvatar: '',
          };
        }
        const isFromMe = chat.lastMessage?.user.login === authorizedUser.login;
        const individualChatName = [companion.firstName, companion.secondName].join(' ');
        const individualChatAvatar = companion.avatar;

        return {
          ...chat,
          isFromMe,
          individualChatName,
          individualChatAvatar,
        };
      });
    });
  }

  getChatUsers(id: number) {
    return ChatsApi.getChatUsers({ id }).then((users) => ({ chatId: id, users }));
  }

  addUsersToChat(data: { users: number[]; chatId: number }) {
    return ChatsApi.addUsersToChat(data);
  }

  createChat(login: string) {
    return new Promise((resolve, reject) => {
      AuthController.getUser().then((user) => {
        UserController.search(login).then((users) => {
          const existingUser = users.find((u) => u.login === login);

          if (existingUser) {
            ChatsApi.createChat({ title: PRIVATE_CHAT_NAME }).then(({ id: chatId }) => {
              this.addUsersToChat({ chatId, users: [existingUser.id, user.id] }).then(() => {
                resolve('Chat is created');
              });
            });
          } else {
            reject(new Error(`Пользователь ${login} не найден`));
          }
        });
      });
    });
  }

  token(chatId: number) {
    return ChatsApi.token(chatId).then((res): string => res.token);
  }

  createSocket(
    data: { chatId: number },
    callbacks: {
      onOpen?: (_socket: WebSocket) => void;
      onClose?: (_data: { message: string; code: number; reason: string }) => void;
      onMessage?: (_data: TNewMessageResponse | TMessageResponse[]) => void;
    }
  ) {
    const { chatId } = data;
    AuthController.getUser().then(({ id: userId }) => {
      const { onOpen, onClose, onMessage } = callbacks;
      this.token(chatId).then((token) => {
        const socket = new WebSocket(`${WS_URL}/chats/${userId}/${chatId}/${token}`);

        socket.onopen = () => {
          if (onOpen) {
            onOpen(socket);
          }
        };

        socket.onclose = (event) => {
          let message = '';
          if (event.wasClean) {
            message = 'Соединение закрыто чисто';
          } else {
            message = 'Обрыв соединения';
          }

          if (onClose) {
            onClose({ message, code: event.code, reason: event.reason });
          }
        };

        socket.onmessage = (event) => {
          if (onMessage) {
            const resData: TNewMessageResponseBackend | TMessageResponseBackend[] = JSON.parse(event.data);

            if (Array.isArray(resData)) {
              onMessage(
                resData.map(
                  (i): TMessageResponse => ({
                    isRead: i.is_read,
                    chatId: i.chat_id,
                    time: i.time,
                    content: i.content,
                    id: i.id,
                    userId: i.user_id,
                    type: i.type,
                    isFromMe: i.user_id === userId,
                  })
                )
              );
            } else {
              onMessage({
                content: resData.content,
                id: resData.id,
                time: resData.time,
                type: resData.type,
                userId: resData.user_id,
                isFromMe: resData.user_id === userId,
              });
            }
          }
        };
      });
    });
  }
}

export const ChatsController = new Controller();
