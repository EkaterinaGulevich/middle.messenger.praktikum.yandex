import { registerHelper } from 'handlebars';

import { createTmpClassName, renderArrayOfComponentsDOM, validateFormField } from 'src/utils';
import { Component, browserRouter } from 'src/modules';
import { InputComponent } from 'src/components/input/input';

import template from './profile-edit.hbs';
import { TProfileEditComponentState } from './profile-edit.types';
import { createFormElements } from './helpers/create-form-elements';
import './profile-edit.scss';
import { AuthApi } from '../../api';
import { getFormData } from '../../utils';
import { UserApi } from '../../api/user-api';
import { HTTPTransport } from '../../modules';

registerHelper('CG_profile-edit', (options) => createTmpClassName(options, 'profile-edit'));

const INITIAL_STATE: TProfileEditComponentState = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
};

export class ProfileEditComponent extends Component<TProfileEditComponentState> {
  formElements: InputComponent[];

  readonly saveBtnId: string;
  readonly cancelBtnId: string;
  readonly formId: string;
  readonly avatarId: string;

  constructor(parentElemSelector: string) {
    super(INITIAL_STATE, parentElemSelector);

    this.saveBtnId = 'SAVE_BTN';
    this.cancelBtnId = 'CANCEL_BTN';
    this.formId = 'EDIT_FORM';
    this.avatarId = 'AVATAR_ID';

    this.onSave = this.onSave.bind(this);

    this.formElements = [];
  }

  registerEvents() {
    const cancelBtn = document.querySelector(`#${this.cancelBtnId}`);
    if (!cancelBtn) {
      throw Error(`Not found HTMLElement with id=${this.cancelBtnId} in DOM`);
    }
    cancelBtn.addEventListener('click', this.onCancel);

    const saveBtn = document.querySelector(`#${this.saveBtnId}`);
    saveBtn?.addEventListener('click', this.onSave);

    const avatar = document.querySelector(`#${this.avatarId}`);

    document.querySelector('#upload_file')?.addEventListener('change', (_e) => {
      const uploadedAvatar = document.querySelector('input[name="avatar"]');
      const form = new FormData();
      // @ts-ignore
      form.append('avatar', uploadedAvatar?.files[0]);

      // UserApi.changeAvatar(formData)

      fetch('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
        method: 'PUT',
        credentials: 'include', // Нам нужно подставлять cookies
        mode: 'cors', // Работаем с CORS
        body: form,
      })
        .then(() => {
          browserRouter.go('/edit-profile')
        });

    });

    avatar?.addEventListener('click', () => {
      // @ts-ignore
      document.querySelector('#upload_file')?.click();
    });
  }

  componentDidMount() {
    AuthApi.getUser().then((res: any) => {
      const data = JSON.parse(res.response);
      this.setState(data);
    });

    this.formElements = createFormElements(this);
    renderArrayOfComponentsDOM(this.formElements, `#${this.formId}`);
    this.registerEvents();
  }

  componentDidUpdate() {
    this.formElements = createFormElements(this);

    renderArrayOfComponentsDOM(this.formElements, `#${this.formId}`);
    this.registerEvents();
  }

  onCancel() {
    browserRouter.back();
  }

  onSave() {
    let isError = false;

    this.formElements.forEach((input) => {
      const error = validateFormField(input.state.name, input.value);
      input.setState({ error });
      if (error) {
        isError = true;
      }
    });

    if (!isError) {
      // @ts-ignore
      UserApi.changeProfile(getFormData('edit')).then(() => {
        browserRouter.go('/profile');
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
      saveBtnId: this.saveBtnId,
      cancelBtnId: this.cancelBtnId,
      formId: this.formId,
      id: this.avatarId,
      // @ts-ignore
      avatar: this.state.avatar,
    });
  }
}
