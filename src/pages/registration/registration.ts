import Handlebars from 'handlebars';

import { createTmpClassName, getFormData, validateFormField } from 'src/utils';
import { router, Component } from 'src/core';
import { InputComponent } from 'src/components/input/input';
import { AuthController } from 'src/controllers';
import { store } from 'src/store';

import { TRegistrationComponentState, TRegistrationFormInputs } from './registration.types';
import { createFormElements } from './helpers/create-form-elements';
import template from './registration.hbs';
import './registration.scss';
import { ButtonComponent } from 'src/components/button/button';
import { LOGIN_ALREADY_EXISTS } from 'src/consts/api-errors';

Handlebars.registerHelper('CG_registration', (options) => createTmpClassName(options, 'registration'));

const INITIAL_STATE: TRegistrationComponentState = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  phone: '',
  password: '',
  repeatPassword: '',
};

export class RegistrationComponent extends Component<TRegistrationComponentState> {
  readonly childComponents: TRegistrationFormInputs & { signUpButton: ButtonComponent };

  constructor() {
    super(INITIAL_STATE);

    this.onRegistration = this.onRegistration.bind(this);

    this.childComponents = {
      ...createFormElements(this),
      signUpButton: new ButtonComponent(
        { value: 'Зарегистрироваться', fullWidth: true },
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
    let isError = false;

    const { loginInput, firstNameInput, secondNameInput, phoneInput, passwordInput, repeatPasswordInput, emailInput } =
      this.childComponents;

    [loginInput, firstNameInput, secondNameInput, phoneInput, passwordInput, repeatPasswordInput, emailInput].forEach(
      (input) => {
        const error = validateFormField(input.state.name, input.value);
        input.setState({ error });
        if (error) {
          isError = true;
        }
      }
    );

    if (!isError) {
      const {
        login = '',
        password = '',
        email = '',
        firstName = '',
        secondName = '',
        phone = '',
      } = getFormData('registration');
      AuthController.signUp({
        login,
        password,
        email,
        firstName,
        secondName,
        phone,
      })
        .then(() => {
          router.go('/chats');
        })
        .catch((error) => {
          if (error.reason === LOGIN_ALREADY_EXISTS) {
            // TODO: выводить в уведомлении
            // eslint-disable-next-line
            alert('Пользователь с введенным логином уже существует. Пожалуйста, введите придумайте другой логин');
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
      emailInput: this.childComponents.emailInput.elementHtml,
      loginInput: this.childComponents.loginInput.elementHtml,
      firstNameInput: this.childComponents.firstNameInput.elementHtml,
      secondNameInput: this.childComponents.secondNameInput.elementHtml,
      phoneInput: this.childComponents.phoneInput.elementHtml,
      passwordInput: this.childComponents.passwordInput.elementHtml,
      repeatPasswordInput: this.childComponents.repeatPasswordInput.elementHtml,
      signUpButton: this.childComponents.signUpButton.elementHtml,
    });
  }
}
