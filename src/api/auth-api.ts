import { HTTPTransport } from 'src/modules';
import { BASE_URL } from 'src/consts/common';
import { TSignUpRequest, TSignInRequest, TUserResponse, TSignUpRequestBackend, TUserResponseBackend } from 'src/types';

const authAPIInstance = new HTTPTransport(`${BASE_URL}/auth`);

// TODO: пройтись по проекту и проверить, что название файлов соответствует названию класса
class Api {
  signUp(data: TSignUpRequest) {
    const requestData: TSignUpRequestBackend = {
      first_name: data.firstName,
      second_name: data.secondName,
      login: data.login,
      email: data.email,
      password: data.password,
      phone: data.phone,
    };

    return authAPIInstance
      .post('/signup', {
        data: requestData,
      })
      .then((res): { id: number } => JSON.parse(res.response));
  }

  signIn(data: TSignInRequest) {
    return authAPIInstance.post('/signin', { data }).then((res): 'OK' => res.response);
  }

  logout() {
    return authAPIInstance.post('/logout').then((res): 'OK' => res.response);
  }

  getUser() {
    return authAPIInstance.get('/user').then((res): TUserResponse => {
      const responseData: TUserResponseBackend = JSON.parse(res.response);

      return {
        id: responseData.id,
        firstName: responseData.first_name,
        secondName: responseData.second_name,
        displayName: responseData.display_name,
        login: responseData.login,
        email: responseData.email,
        phone: responseData.phone,
        avatar: responseData.avatar,
      };
    });
  }
}

export const AuthApi = new Api();
