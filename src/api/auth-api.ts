import { HTTPTransport } from 'src/modules';
import { BaseAPI } from './base';
import { BASE_URL } from '../consts/common';

const authAPIInstance = new HTTPTransport(`${BASE_URL}/auth`);

class Api extends BaseAPI {
  signup(payload: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return authAPIInstance.post('/signup', payload);
  }

  signin(payload: { login: string; password: string }) {
    return authAPIInstance.post('/signin', payload);
  }

  logout() {
    console.log('logout')
    return authAPIInstance.post('/logout');
  }

  getUser() {
    return authAPIInstance.get('/user');
  }
}

export const AuthApi = new Api();
