import { registerHelper } from 'handlebars';

import { createTmpClassName, validateFormField, renderArrayOfComponentsDOM, getFormData } from 'src/utils';
import { Component } from 'src/modules';
import { InputComponent } from 'src/components/input/input';

import template from './auth.hbs';
import { TAuthComponentState } from './auth.types';
import { createFormElements } from './helpers/create-form-elements';
import './auth.scss';

registerHelper('CG_auth', (options) => createTmpClassName(options, 'auth'));

const INITIAL_STATE: TAuthComponentState = {
  login: '',
  password: '',
};

export class AuthComponent extends Component<TAuthComponentState> {
  readonly authBtnId: string;
  readonly formId: string;
  formElements: InputComponent[];

  constructor(parentElemSelector: string) {
    super(INITIAL_STATE, parentElemSelector);

    this.authBtnId = 'AUTH_BTN';
    this.formId = 'FORM';
    this.formElements = createFormElements(this);

    this.onAuth = this.onAuth.bind(this);
  }

  registerEvents() {
    const authBtn = document.querySelector(`#${this.authBtnId}`);
    if (!authBtn) {
      throw Error(`Not found HTMLElement with id=${this.authBtnId} in DOM`);
    }
    authBtn.addEventListener('click', this.onAuth);
  }

  componentDidMount() {
    renderArrayOfComponentsDOM(this.formElements, `#${this.formId}`);
    this.registerEvents();
  }

  onAuth() {
    console.log(getFormData('auth'));

    let isError = false;
    this.formElements.forEach((input) => {
      const error = validateFormField(input.state.name, input.value);
      input.setState({ error });
      if (error) {
        isError = true;
      }
    });

    if (!isError) {
      window.location.pathname = '/chats';
    }
  }

  onBlur(event: Event, component: InputComponent) {
    const target = event.target as HTMLInputElement;
    const error = validateFormField(component.state.name, target.value);
    component.setState({ error });
  }

  render() {
    return template({
      authBtnId: this.authBtnId,
      formId: this.formId,
    });
  }
}

export const createAuth = (parentSelector: string) => new AuthComponent(parentSelector);
