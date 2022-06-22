import { HTTPTransport } from 'src/modules';
import { BaseAPI } from './base';
import { BASE_URL } from '../consts/common';

const chatsAPIInstance = new HTTPTransport(`${BASE_URL}/chats`);

class Api extends BaseAPI {
  getChats() {
    return chatsAPIInstance.get('/', {data: {limit: 100}});
  }
  createChat(payload: { title: string }) {
    return chatsAPIInstance.post('/', { data: payload });
  }
  addUsersToChat(payload: { users: number[]; chatId: number }) {
    return chatsAPIInstance.put('/users', { data: payload });
  }
  token(chatId: number) {
    return chatsAPIInstance.post(`/token/${chatId}`)
  }
}

export const ChatsApi = new Api();
