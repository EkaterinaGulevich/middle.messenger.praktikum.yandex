import Handlebars from 'handlebars';

import { createTmpClassName, validateFormField, getFormData, createClassName } from 'src/utils';
import { router, Component } from 'src/core';
import { AuthController, UserController } from 'src/controllers';
import { InputComponent } from 'src/components/input/input';
import { RESOURSES_URL } from 'src/consts/common';

import template from './profile-edit.hbs';
import { TFormInputComponents, TProfileEditComponentState } from './profile-edit.types';
import { createFormElements } from './helpers/create-form-elements';
import './profile-edit.scss';
import { ButtonComponent } from 'src/components/button/button';

const BASE_CLASS_NAME = 'profile-edit';

Handlebars.registerHelper('CG_profile-edit', (options) => createTmpClassName(options, BASE_CLASS_NAME));

const INITIAL_STATE: TProfileEditComponentState = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  phone: '',
  avatar: '',
};

export class ProfileEditComponent extends Component<TProfileEditComponentState> {
  childComponents: TFormInputComponents & {
    cancelButton: ButtonComponent;
    saveButton: ButtonComponent;
  };

  readonly avatarId: string;

  constructor() {
    super(INITIAL_STATE);

    this.avatarId = 'AVATAR_ID';

    this.onSave = this.onSave.bind(this);

    this.childComponents = {
      ...createFormElements(this),
      saveButton: new ButtonComponent(
        {
          value: 'Сохранить',
          className: createClassName(BASE_CLASS_NAME, 'button'),
        },
        {
          onclick: this.onSave,
        }
      ),
      cancelButton: new ButtonComponent(
        {
          value: 'Отмена',
          variant: 'secondary',
          className: createClassName(BASE_CLASS_NAME, 'button'),
        },
        {
          onclick: this.onCancel,
        }
      ),
    };
  }

  registerEvents() {
    const uploadInput = document.querySelector('#upload-file') as HTMLInputElement;

    const avatar = document.querySelector(`#${this.avatarId}`);
    avatar?.addEventListener('click', () => {
      uploadInput.click();
    });

    uploadInput.addEventListener('change', (_e) => {
      const uploadedAvatar = document.querySelector('input[name="avatar"]') as HTMLInputElement;

      const file = uploadedAvatar?.files?.[0];
      if (file) {
        UserController.changeAvatar(file).then((user) => {
          this.setState(user);
        });
      }
    });
  }

  componentDidMount() {
    AuthController.getUser().then((user) => {
      this.setState(user);
      this.childComponents.emailInput.value = user.email;
      this.childComponents.loginInput.value = user.login;
      this.childComponents.firstNameInput.value = user.firstName;
      this.childComponents.secondNameInput.value = user.secondName;
      this.childComponents.phoneNameInput.value = user.phone;
    });
  }

  onCancel() {
    router.back();
  }

  onSave() {
    let isError = false;
    const { emailInput, loginInput, firstNameInput, secondNameInput, phoneNameInput } = this.childComponents;

    [emailInput, loginInput, firstNameInput, secondNameInput, phoneNameInput].forEach((input) => {
      const error = validateFormField(input.state.name, input.value);
      input.setState({ error });
      if (error) {
        isError = true;
      }
    });

    if (!isError) {
      const { firstName, email, secondName, login, phone } = getFormData('edit');
      UserController.changeProfile({ firstName, email, secondName, login, phone }).then(() => {
        router.go('/profile');
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
      avatarId: this.avatarId,
      avatar: this.state.avatar ? `${RESOURSES_URL}${this.state.avatar}` : '',
      emailInput: this.childComponents.emailInput.elementHtml,
      loginInput: this.childComponents.loginInput.elementHtml,
      firstNameInput: this.childComponents.firstNameInput.elementHtml,
      secondNameInput: this.childComponents.secondNameInput.elementHtml,
      phoneNameInput: this.childComponents.phoneNameInput.elementHtml,
      cancelButton: this.childComponents.cancelButton.elementHtml,
      saveButton: this.childComponents.saveButton.elementHtml,
    });
  }
}
