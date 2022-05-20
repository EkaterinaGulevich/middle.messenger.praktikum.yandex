import { NotFoundPageTpl } from './pages/not-found/not-found';
import { createChats } from './pages/chats/chats';
import { runAuthPage, AuthTpl } from './pages/auth/auth';
import { runRegistrationPage, RegistrationTpl } from './pages/registration/registration';
import { ProfileViewTpl } from './pages/profile-view/profile-view';
import { ProfileEditTpl } from './pages/profile-edit/profile-edit';
import { renderComponentDOM } from './utils/render-сomponent-dom';
import './components';
import './style.scss';

const currentPathname = window.location.pathname;
const ROOT_SELECTOR = '#root';
const root = document.getElementById('root');

if (!root) {
  throw Error('Not found HTMLElement with id="root" in DOM');
}

switch (currentPathname) {
  case '/':
  case '/chats':
    renderComponentDOM(createChats(ROOT_SELECTOR));
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
