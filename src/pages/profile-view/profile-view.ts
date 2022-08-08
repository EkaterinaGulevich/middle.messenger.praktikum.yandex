import { registerHelper } from 'handlebars';

import { createClassName, createTmpClassName } from 'src/utils';
import { router, Component } from 'src/modules';
import { AuthController } from 'src/controllers';
import { ButtonComponent } from 'src/components/button/button';
import { RESOURSES_URL } from 'src/consts/common'

import { TProfileViewComponentState } from './profile-view.types';
import template from './profile-view.hbs';
import './profile-view.scss';

const BASE_CLASS_NAME = 'profile-view';

registerHelper('CG_profile-view', (options) => createTmpClassName(options, BASE_CLASS_NAME));

const initialState: TProfileViewComponentState = {};

export class ProfileViewComponent extends Component<TProfileViewComponentState> {
  readonly childComponents: { editProfileButton: ButtonComponent; editPasswordButton: ButtonComponent };

  constructor() {
    super(initialState);
    this.childComponents = {
      editProfileButton: new ButtonComponent(
        {
          value: 'Изменить данные',
          className: createClassName(BASE_CLASS_NAME, 'button'),
        },
        {
          onclick: this.onEditProfileClick,
        }
      ),
      editPasswordButton: new ButtonComponent({
        value: 'Изменить пароль',
        // TODO: добавить функционал для изменения пароля
        disabled: true,
        className: createClassName(BASE_CLASS_NAME, 'button'),
      }),
    };
  }

  componentDidMount() {
    AuthController.getUser().then((user) => {
      this.setState(user);
    });
  }

  onEditProfileClick() {
    router.go('/edit-profile');
  }

  render() {
    return template({
      email: this.state.email,
      login: this.state.login,
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      phone: this.state.phone,
      avatar: this.state.avatar ? `${RESOURSES_URL}${this.state.avatar}` : '',
      editProfileButton: this.childComponents.editProfileButton.elementHtml,
      editPasswordButton: this.childComponents.editPasswordButton.elementHtml,
    });
  }
}
