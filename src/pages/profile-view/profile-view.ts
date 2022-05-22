import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './profile-view.hbs';
import './profile-view.scss';
import { Component } from '../../modules';
import { TJsonObject } from '../../common-types';

registerHelper('CG_profile-view', (options) => createTmpClassName(options, 'profile-view'));

export class ProfileViewComponent extends Component<TJsonObject> {
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

  componentDidMount() {
    this.registerEvents();
  }

  onEditProfileClick() {
    window.location.pathname = '/edit-profile';
  }

  render() {
    return template({
      editProfileBtnId: this.editProfileBtnId,
      editPasswordBtnId: this.editPasswordBtnId,
    });
  }
}

export const createProfileView = (parentSelector: string) => new ProfileViewComponent(parentSelector);
