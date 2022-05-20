import { registerHelper } from 'handlebars';

import { createTmpClassName, getFormData } from 'src/utils';

import template from './registration.hbs';
import { TRegistrationFormData } from './registration.types';
import './registration.scss';

registerHelper('CG_registration', (options) => createTmpClassName(options, 'registration'));

export function runRegistrationPage() {
  const btnRegistration = document.getElementById('btn-registration');
  if (!btnRegistration) {
    throw Error('Not found HTMLElement with id="btn-registration" in DOM');
  }

  btnRegistration.onclick = () => {
    const formData: TRegistrationFormData = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      repeat_password: '',
      ...getFormData('registration'),
    };
    console.log(formData);
    window.location.pathname = '/chats';
  };
}

export const RegistrationTpl = template;
