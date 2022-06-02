import { registerHelper } from 'handlebars';

import { createTmpClassName, getFormData } from 'src/utils';

import template from './registration.hbs';
import { TRegistrationComponentState } from './registration.types';
import './registration.scss';
import { Component } from '../../modules';
import { InputComponent } from '../../components/input/input';
import { renderArrayOfComponentsDOM, validateFormField } from '../../utils';
import { createFormElements } from './helpers/create-form-elements';

registerHelper('CG_registration', (options) => createTmpClassName(options, 'registration'));

const INITIAL_STATE: TRegistrationComponentState = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  repeat_password: '',
};

export class RegistrationComponent extends Component<TRegistrationComponentState> {
  readonly registrationBtnId: string;
  readonly formId: string;
  formElements: InputComponent[];

  constructor(parentElemSelector: string) {
    super(INITIAL_STATE, parentElemSelector);

    this.registrationBtnId = 'REGISTRATION_BTN';
    this.formId = 'FORM';
    this.formElements = createFormElements(this);

    this.onRegistration = this.onRegistration.bind(this);
  }

  registerEvents() {
    const registrationBtn = document.querySelector(`#${this.registrationBtnId}`);
    if (!registrationBtn) {
      throw Error(`Not found HTMLElement with id=${this.registrationBtnId} in DOM`);
    }
    registrationBtn.addEventListener('click', this.onRegistration);
  }

  componentDidMount() {
    renderArrayOfComponentsDOM(this.formElements, `#${this.formId}`);
    this.registerEvents();
  }

  onRegistration() {
    console.log(getFormData('registration'));
    let isError = false;

    this.formElements.forEach((input) => {
      const error = validateFormField(input.state.name, input.value);
      input.setState({ error });
      if (error) {
        isError = true;
      }
    });

    if (!isError) {
      window.location.pathname = '/auth';
    }
  }

  onBlur(event: Event, component: InputComponent) {
    const target = event.target as HTMLInputElement;
    const error = validateFormField(component.state.name, target.value);
    component.setState({ error });
  }

  render() {
    return template({
      registrationBtnId: this.registrationBtnId,
      formId: this.formId,
    });
  }
}

export const createRegistration = (parentSelector: string) => new RegistrationComponent(parentSelector);
