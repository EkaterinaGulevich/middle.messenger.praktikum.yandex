import { HTTPTransport } from 'src/modules';
import { BaseAPI } from './base';
import { BASE_URL } from '../consts/common';

const userAPIInstance = new HTTPTransport(`${BASE_URL}/user`);

class Api extends BaseAPI {
  search(login: string) {
    const data = {
      login,
    };
    return userAPIInstance.post('/search', {
      data,
    });
  }

  changeProfile(payload: any) {
    return userAPIInstance.put('/profile', {
      data: { display_name: [payload.second_name, payload.first_name].join(' '), ...payload },
    });
  }

  changeAvatar(avatar: any) {
    return userAPIInstance.put('/profile/avatar', {
      data: avatar,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export const UserApi = new Api();
