import { HTTPTransport } from 'src/modules';
import { BaseAPI } from './base';
import { BASE_URL } from '../consts/common';
import { AuthApi } from './auth-api';

const chatsAPIInstance = new HTTPTransport(`${BASE_URL}/chats`);

class Api extends BaseAPI {
  getChats() {
    return chatsAPIInstance.get('/', { data: { limit: 100 } });
  }
  createChat(payload: { title: string }) {
    return chatsAPIInstance.post('/', { data: payload });
  }
  addUsersToChat(payload: { users: number[]; chatId: number }) {
    return chatsAPIInstance.put('/users', { data: payload });
  }
  token(chatId: number) {
    return chatsAPIInstance.post(`/token/${chatId}`);
  }
  getCompanion(id: number) {
    return chatsAPIInstance.get(`/${id}/users`).then(async (res: any) => {
      const users = JSON.parse(res.response) || [];

      const me = await AuthApi.getUser().then((res: any) => JSON.parse(res.response));

      const companion = users.find((u: any) => u.id !== me.id);

      return companion;
    });
  }
}

export const ChatsApi = new Api();
