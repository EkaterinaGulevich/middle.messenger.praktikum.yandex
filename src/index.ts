import { renderComponentDOM } from 'src/utils';

import { createChats } from './pages/chats/chats';
import { createAuth } from './pages/auth/auth';
import { createRegistration } from './pages/registration/registration';
import { createProfileView } from './pages/profile-view/profile-view';
import { createProfileEdit } from './pages/profile-edit/profile-edit';

import { NotFoundPageTpl } from './pages/not-found/not-found';
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
    renderComponentDOM(createAuth(ROOT_SELECTOR));
    break;
  case '/registration':
    renderComponentDOM(createRegistration(ROOT_SELECTOR));
    break;
  case '/profile':
    renderComponentDOM(createProfileView(ROOT_SELECTOR));
    break;
  case '/edit-profile':
    renderComponentDOM(createProfileEdit(ROOT_SELECTOR));
    break;
  default:
    root.innerHTML = NotFoundPageTpl();
    break;
}
