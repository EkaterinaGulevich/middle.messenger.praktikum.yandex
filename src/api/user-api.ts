import { HTTPTransport } from 'src/core';
import { BASE_URL } from 'src/consts/common';
import { TChangeProfileRequest, TChangeProfileRequestBackend, TUserResponse, TUserResponseBackend } from 'src/types';

const userAPIInstance = new HTTPTransport(`${BASE_URL}/user`);

class Api {
  search(data: { login: string }) {
    return userAPIInstance
      .post('/search', {
        data,
      })
      .then((res): TUserResponse[] => {
        const responseData: TUserResponseBackend[] = JSON.parse(res.response);

        return responseData.map(
          (item): TUserResponse => ({
            email: item.email,
            login: item.login,
            displayName: item.display_name,
            secondName: item.second_name,
            avatar: item.avatar,
            phone: item.phone,
            id: item.id,
            firstName: item.first_name,
          })
        );
      });
  }

  changeProfile(data: TChangeProfileRequest) {
    const dataRequest: TChangeProfileRequestBackend = {
      first_name: data.firstName,
      second_name: data.secondName,
      display_name: data.displayName || '',
      login: data.login,
      email: data.email,
      phone: data.phone,
    };

    return userAPIInstance
      .put('/profile', {
        data: dataRequest,
      })
      .then((res): TUserResponse => {
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

  changeAvatar(file: File) {
    return userAPIInstance
      .put('/profile/avatar', {
        data: file,
      })
      .then((res): TUserResponse => {
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

export const UserApi = new Api();
