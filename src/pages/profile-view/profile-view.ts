import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './profile-view.hbs';
import './profile-view.scss';
import { browserRouter, Component } from '../../modules';
import { AuthApi } from '../../api'
import { TProfileViewTmpProps } from './profile-view.types'

registerHelper('CG_profile-view', (options) => createTmpClassName(options, 'profile-view'));

export class ProfileViewComponent extends Component<TProfileViewTmpProps> {
  readonly editProfileBtnId: string;
  readonly editPasswordBtnId: string;

  constructor(parentElemSelector: string) {
    super({}, parentElemSelector);

    this.editProfileBtnId = 'EDIT_PROFILE_BTN';
    this.editPasswordBtnId = 'EDIT_PASSWORD_BTN';
  }

  registerEvents() {
    const editProfileBtn = document.querySelector(`#${this.editProfileBtnId}`);
    if (!editProfileBtn) {
      throw Error(`Not found HTMLElement with id=${this.editProfileBtnId} in DOM`);
    }
    editProfileBtn.addEventListener('click', this.onEditProfileClick);
  }

  componentDidUpdate() {
    this.registerEvents();

  }

  componentDidMount() {
    this.registerEvents();

    AuthApi.getUser().then((res: any) => {
      const data = JSON.parse(res.response);
      this.setState(data)
    });
  }

  onEditProfileClick() {
    browserRouter.go('/edit-profile');
  }

  render() {
    return template({
      editProfileBtnId: this.editProfileBtnId,
      editPasswordBtnId: this.editPasswordBtnId,
      email: this.state.email,
      login: this.state.login,
      first_name: this.state.first_name,
      second_name: this.state.second_name,
      phone: this.state.phone,
      //@ts-ignore
      src: this.state.avatar
    });
  }
}
