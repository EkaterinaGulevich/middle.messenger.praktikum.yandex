import { TSignInRequest, TSignUpRequest } from 'src/types';
import { AuthApi } from 'src/api';
import { store } from 'src/store';
import { STORE_ITEM } from 'src/consts/local-storage-keys';

class Controller {
  signUp(data: TSignUpRequest) {
    return AuthApi.signUp(data);
  }

  signIn(data: TSignInRequest) {
    return AuthApi.signIn(data);
  }

  logout() {
    localStorage.removeItem(STORE_ITEM);
    return AuthApi.logout().then(() => {
      window.location.reload();
    });
  }

  async getUser() {
    const currentUser = store.getState().currentUser;

    if (currentUser?.id) {
      return currentUser;
    }
    return AuthApi.getUser().then((user) => {
      store.set('currentUser', user);
      return user;
    });
  }
}

export const AuthController = new Controller();
