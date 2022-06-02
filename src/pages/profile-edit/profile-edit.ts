import { registerHelper } from 'handlebars';

import { createTmpClassName, renderArrayOfComponentsDOM, validateFormField } from 'src/utils';
import { Component } from 'src/modules';
import { InputComponent } from 'src/components/input/input';

import template from './profile-edit.hbs';
import { TProfileEditComponentState } from './profile-edit.types';
import { createFormElements } from './helpers/create-form-elements';
import './profile-edit.scss';

registerHelper('CG_profile-edit', (options) => createTmpClassName(options, 'profile-edit'));

const INITIAL_STATE: TProfileEditComponentState = {
  email: 'email@gmail.com',
  login: 'meteor',
  first_name: 'Екатерина',
  second_name: 'Гулевич',
  phone: '+71111111111',
};

export class ProfileEditComponent extends Component<TProfileEditComponentState> {
  formElements: InputComponent[];

  readonly saveBtnId: string;
  readonly cancelBtnId: string;
  readonly formId: string;

  constructor(parentElemSelector: string) {
    super(INITIAL_STATE, parentElemSelector);

    this.saveBtnId = 'SAVE_BTN';
    this.cancelBtnId = 'CANCEL_BTN';
    this.formId = 'EDIT_FORM';

    this.formElements = createFormElements(this);
  }

  registerEvents() {
    const cancelBtn = document.querySelector(`#${this.cancelBtnId}`);
    if (!cancelBtn) {
      throw Error(`Not found HTMLElement with id=${this.cancelBtnId} in DOM`);
    }
    cancelBtn.addEventListener('click', this.onCancel);
  }

  componentDidMount() {
    renderArrayOfComponentsDOM(this.formElements, `#${this.formId}`);
    this.registerEvents();
  }

  onCancel() {
    window.location.pathname = '/chats';
  }

  onBlur(event: Event, component: InputComponent) {
    const target = event.target as HTMLInputElement;
    const error = validateFormField(component.state.name, target.value);
    component.setState({ error });
  }

  render() {
    return template({
      saveBtnId: this.saveBtnId,
      cancelBtnId: this.cancelBtnId,
      formId: this.formId,
    });
  }
}

export const createProfileEdit = (parentSelector: string) => new ProfileEditComponent(parentSelector);
