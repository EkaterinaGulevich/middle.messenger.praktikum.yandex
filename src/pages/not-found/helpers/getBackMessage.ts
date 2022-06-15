import { TRoutPathname } from 'src/consts/routes';

export const getBackMessage = (prevPathname: TRoutPathname) => {
  switch (prevPathname) {
    case '/':
    case '/chats':
      return 'Назад к чатам';
    case '/auth':
      return 'Назад к авторизации';
    case '/registration':
      return 'Назад к регистрации';
    case '/profile':
      return 'Назад к просмотру профиля';
    case '/edit-profile':
      return 'Назад к редактированию профиля';
    default:
      return 'Назад';
  }
};
