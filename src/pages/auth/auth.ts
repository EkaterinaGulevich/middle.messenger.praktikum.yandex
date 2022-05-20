import { registerHelper } from 'handlebars';

import { createTmpClassName, getFormData } from 'src/utils';

import template from './auth.hbs';
import { TAuthFormData } from './auth.types';
import './auth.scss';

registerHelper('CG_auth', (options) => createTmpClassName(options, 'auth'));

export function runAuthPage() {
  const btnAuth = document.getElementById('btn-auth');
  if (!btnAuth) {
    throw Error('Not found HTMLElement with id="btn-auth" in DOM');
  }
  btnAuth.onclick = () => {
    const formData: TAuthFormData = {
      login: '',
      password: '',
      ...getFormData('auth'),
    };
    console.log(formData);
    window.location.pathname = '/chats';
  };
}

export const AuthTpl = template;
