import { NotFoundPageTpl } from './pages/not-found/not-found';
import { ChatsTpl } from './pages/chats/chats';
import { runAuthPage, AuthTpl } from './pages/auth/auth';
import {
  runRegistrationPage,
  RegistrationTpl,
} from './pages/registration/registration';
import { ProfileViewTpl } from './pages/profile-view/profile-view';
import { ProfileEditTpl } from './pages/profile-edit/profile-edit';
import './components';
import './style.scss';

const currentPathname = window.location.pathname;
const root = document.getElementById('root');

if (!root) {
  throw Error('Not found HTMLElement with id="root" in DOM');
}

switch (currentPathname) {
  case '/':
  case '/chats':
    root.innerHTML = ChatsTpl();
    break;
  case '/auth':
    root.innerHTML = AuthTpl();
    runAuthPage();
    break;
  case '/registration':
    root.innerHTML = RegistrationTpl();
    runRegistrationPage();
    break;
  case '/profile':
    root.innerHTML = ProfileViewTpl();
    break;
  case '/edit-profile':
    root.innerHTML = ProfileEditTpl();
    break;
  default:
    root.innerHTML = NotFoundPageTpl();
    break;
}
