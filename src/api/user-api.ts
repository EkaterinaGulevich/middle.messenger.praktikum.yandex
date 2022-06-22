import { HTTPTransport } from 'src/modules';
import { BaseAPI } from './base';
import { BASE_URL } from '../consts/common';

const userAPIInstance = new HTTPTransport(`${BASE_URL}/user`);

class Api extends BaseAPI {
  // getChats() {
  //   return chatsAPIInstance.get('/');
  // }
  // createChat(payload: { title: string }) {
  //   return chatsAPIInstance.post('/', { data: payload });
  // }
  // addUsersToChat(payload: { users: number[]; chatId: number }) {
  //   return chatsAPIInstance.put('/users', { data: payload });
  // }
  search(login: string) {
    const data = {
      login,
    };
    return userAPIInstance.post('/search', {
      data,
    });
  }
}

export const UserApi = new Api();
