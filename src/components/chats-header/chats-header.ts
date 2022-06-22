import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './chats-header.hbs';
import { TChatsHeaderComponentState } from './chats-header.types';
import './chats-header.scss';
import { TInputComponentCallbacks } from '../input/input.types';
import { InputComponent } from '../input/input';
import { renderComponentDOM } from '../../utils';
import { AuthApi } from '../../api';
import { browserRouter } from '../../modules';
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal';
import { ChatsApi } from '../../api/chats-api';
import store from '../../store/store';

registerHelper('CG_chats-header', (options) => createTmpClassName(options, 'chats-header'));

const INITIAL_STATE: TChatsHeaderComponentState = {
  isSettingsOpen: false,
};

export class ChatsHeaderComponent extends Component<TChatsHeaderComponentState> {
  readonly searchInputId: string;
  readonly settingsBtnId: string;
  readonly profileBtnId: string;
  readonly logoutBtnId: string;
  readonly linksBtnId: string;
  readonly addContactBtnId: string;
  meta: {
    addContactModal: AddContactModalComponent | null;
  };

  constructor(parentElem: string) {
    super(INITIAL_STATE, parentElem, () => ({}));

    this.onClickSettings = this.onClickSettings.bind(this);
    this.onGoToProfile = this.onGoToProfile.bind(this);
    this.showAddContactModal = this.showAddContactModal.bind(this);
    this.onAddContact = this.onAddContact.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.searchInputId = 'SEARCH_INPUT';
    this.settingsBtnId = 'SETTINGS_BTN';
    this.profileBtnId = 'PROFILE_BTN_ID';
    this.linksBtnId = 'LINKS_BTN_ID';
    this.addContactBtnId = 'ADD_CONTACT_BTN_ID';
    this.logoutBtnId = 'LOGOUT_BTN_ID';

    this.meta = {
      addContactModal: null,
    };
  }

  componentDidUpdate() {
    this.addEvents();
    this.renderSearchInput();
  }

  onClickSettings() {
    this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
  }

  onLogout() {
    AuthApi.logout().then(() => {
      browserRouter.go('/auth');
    });
  }

  onGoToProfile() {
    browserRouter.go('/profile');
  }

  goToDictionary() {
    browserRouter.go('/dictionary');
  }

  addEvents() {
    const settingsBtn = document.querySelector(`#${this.settingsBtnId}`);
    settingsBtn?.addEventListener('click', this.onClickSettings);

    const logoutBtn = document.querySelector(`#${this.logoutBtnId}`);
    logoutBtn?.addEventListener('click', this.onLogout);

    const profileBtn = document.querySelector(`#${this.profileBtnId}`);
    profileBtn?.addEventListener('click', this.onGoToProfile);

    const addContactBtn = document.querySelector(`#${this.addContactBtnId}`);
    addContactBtn?.addEventListener('click', this.showAddContactModal);

    const linksBtn = document.querySelector(`#${this.linksBtnId}`);
    linksBtn?.addEventListener('click', this.goToDictionary);
  }

  onAddContact() {
    ChatsApi.getChats().then((getChatsRes: any) => {
      store.set('chats', JSON.parse(getChatsRes.response));
    });
  }

  showAddContactModal() {
    const modal = new AddContactModalComponent('#modal', this.onAddContact);
    this.meta.addContactModal = modal;

    this.setState({ isSettingsOpen: false });
    renderComponentDOM(modal);
  }

  onSearch(e: any) {
    const value = e.target.value;

    ChatsApi.getChats().then((res: any) => {
      const chats = JSON.parse(res.response);
      const filtered = chats.filter((chat: any) => chat.title.includes(value));

      store.set('chats', filtered);
    });
  }

  renderSearchInput() {
    this.addEvents();

    const callbacks: TInputComponentCallbacks = {
      change: this.onSearch,
    };
    const searchInput = new InputComponent(
      `#${this.searchInputId}`,
      {
        fullWidth: true,
        className: 'search-input',
        name: 'search',
        placeholder: 'Поиск',
        type: 'text',
        withoutLabel: true,
      },
      callbacks
    );
    renderComponentDOM(searchInput);
  }

  componentDidMount() {
    this.addEvents();
    this.renderSearchInput();
  }

  render() {
    return template({
      searchInputId: this.searchInputId,
      settingsBtnId: this.settingsBtnId,
      isSettingsOpen: this.state.isSettingsOpen,
      profileBtnId: this.profileBtnId,
      logoutBtnId: this.logoutBtnId,
      linksBtnId: this.linksBtnId,
      addContactBtnId: this.addContactBtnId,
    });
  }
}
