import { HTTPTransport } from 'src/modules';
import { BASE_URL } from '../consts/common';
import { TChatResponse, TChatResponseBackend, TUserResponse, TUserResponseBackend } from 'src/types';

const chatsAPIInstance = new HTTPTransport(`${BASE_URL}/chats`);

class Api {
  getChats(data?: { offset?: number; limit?: number; title?: string }) {
    return chatsAPIInstance.get('/', { data }).then((res): TChatResponse[] => {
      const responseData: TChatResponseBackend[] = JSON.parse(res.response);

      return responseData.map((chat): TChatResponse => {
        const lastMessage = chat.last_message;
        return {
          id: chat.id,
          title: chat.title,
          avatar: chat.avatar,
          unreadCount: chat.unread_count,
          lastMessage: !lastMessage
            ? null
            : {
                user: {
                  firstName: lastMessage.user.first_name,
                  secondName: lastMessage.user.second_name,
                  avatar: lastMessage.user.avatar,
                  email: lastMessage.user.email,
                  login: lastMessage.user.login,
                  phone: lastMessage.user.phone,
                },
                time: lastMessage.time,
                content: lastMessage.content,
              },
        };
      });
    });
  }

  createChat(data: { title: string }) {
    return chatsAPIInstance.post('/', { data }).then((res): { id: number } => JSON.parse(res.response));
  }

  getChatUsers(data: { id: number; offset?: number; limit?: number; name?: string; email?: string }) {
    return chatsAPIInstance.get(`/${data.id}/users`, { data }).then((res): TUserResponse[] => {
      const responseData: (TUserResponseBackend & {
        role: string;
      })[] = JSON.parse(res.response);

      return responseData.map(
        (item): TUserResponse => ({
          id: item.id,
          firstName: item.first_name,
          secondName: item.second_name,
          displayName: item.display_name,
          login: item.login,
          email: item.email,
          phone: item.phone,
          avatar: item.avatar,
        })
      );
    });
  }

  token(chatId: number) {
    return chatsAPIInstance.post(`/token/${chatId}`).then(
      (
        res
      ): {
        token: string;
      } => JSON.parse(res.response)
    );
  }

  addUsersToChat(data: { users: number[]; chatId: number }) {
    return chatsAPIInstance.put('/users', { data }).then((res): 'OK' => res.response);
  }
}

export const ChatsApi = new Api();
