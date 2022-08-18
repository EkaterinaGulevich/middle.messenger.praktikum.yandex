import { UserApi } from 'src/api';
import { TChangeProfileRequest } from 'src/types';
import { store } from 'src/store';

class Controller {
  search(login: string) {
    return UserApi.search({ login });
  }

  changeProfile(data: TChangeProfileRequest) {
    return UserApi.changeProfile(data).then((user) => {
      store.set('currentUser', user);
    });
  }

  changeAvatar(file: File) {
    return UserApi.changeAvatar(file).then((user) => {
      store.set('currentUser', user);
      return user;
    });
  }
}

export const UserController = new Controller();
