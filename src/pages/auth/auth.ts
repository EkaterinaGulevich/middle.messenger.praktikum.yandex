import Handlebars from 'handlebars';

import { createTmpClassName, validateFormField, getFormData } from 'src/utils';
import { Component, router } from 'src/core';
import { AuthController } from 'src/controllers';
import { InputComponent } from 'src/components/input/input';
import { ButtonComponent } from 'src/components/button/button';
import { LOGIN_OR_PASSWORD_INCORRECT } from 'src/consts/api-errors';
import { store } from 'src/store';

import template from './auth.hbs';
import { TAuthComponentState } from './auth.types';
import { createFormElements } from './helpers/create-form-elements';
import './auth.scss';

Handlebars.registerHelper('CG_auth', (options) => createTmpClassName(options, 'auth'));

const INITIAL_STATE: TAuthComponentState = {
  login: '',
  password: '',
};

export class AuthComponent extends Component<TAuthComponentState> {
  readonly childComponents: {
    loginInput: InputComponent;
    passwordInput: InputComponent;
    signInBtn: ButtonComponent;
    goToRegistrationButtonComponent: ButtonComponent;
  };

  constructor() {
    super(INITIAL_STATE);

    this.onAuth = this.onAuth.bind(this);

    this.childComponents = {
      ...createFormElements(this),
      signInBtn: new ButtonComponent(
        {
          value: 'Авторизоваться',
          fullWidth: true,
        },
        {
          onclick: this.onAuth,
        }
      ),
      goToRegistrationButtonComponent: new ButtonComponent(
        {
          value: 'Нет аккаунта?',
          fullWidth: true,
          variant: 'link',
        },
        {
          onclick: this.onRegistration,
        }
      ),
    };
  }

  componentDidMount() {
    const currentUser = store.getState().currentUser;
    if (currentUser) {
      AuthController.logout();
    }
  }

  onRegistration() {
    router.go('/registration');
  }

  onAuth() {
    let isError = false;
    const { loginInput, passwordInput } = this.childComponents;
    [loginInput, passwordInput].forEach((input) => {
      const error = validateFormField(input.state.name, input.value);
      input.setState({ error });
      if (error) {
        isError = true;
      }
    });

    if (!isError) {
      const { login = '', password = '' } = getFormData('auth');
      AuthController.signIn({ login, password })
        .then(() => {
          router.go('/chats');
        })
        .catch((error) => {
          if (error.reason === LOGIN_OR_PASSWORD_INCORRECT) {
            // TODO: выводить в уведомлении
            // eslint-disable-next-line
            alert('Неверный логин или пароль');
          }
        });
    }
  }

  onBlur(event: Event, component: InputComponent) {
    const target = event.target as HTMLInputElement;
    const error = validateFormField(component.state.name, target.value);
    component.setState({ error });
  }

  render() {
    return template({
      loginInputComponent: this.childComponents.loginInput.elementHtml,
      passwordInputComponent: this.childComponents.passwordInput.elementHtml,
      signInButtonComponent: this.childComponents.signInBtn.elementHtml,
      goToRegistrationButtonComponent: this.childComponents.goToRegistrationButtonComponent.elementHtml,
    });
  }
}
