import { registerHelper } from 'handlebars';

import { createTmpClassName, debounce, renderModalDOM } from 'src/utils';
import { router, Component } from 'src/modules';
import { ButtonComponent } from 'src/components/button/button';
import { InputComponent } from 'src/components/input/input';
import { AuthController } from 'src/controllers';
import { AddContactModalComponent } from 'src/pages/chats/parts';
import { store } from 'src/store';

import { TChatsHeaderComponentCallbacks, TChatsHeaderComponentState } from './chats-header.types';
import template from './chats-header.hbs';
import './chats-header.scss';

const BASE_CLASS_NAME = 'chats-header';
registerHelper('CG_chats-header', (options) => createTmpClassName(options, BASE_CLASS_NAME));

const INITIAL_STATE: TChatsHeaderComponentState = {
  isSettingsOpen: false,
};

export class ChatsHeaderComponent extends Component<TChatsHeaderComponentState> {
  callbacks: TChatsHeaderComponentCallbacks;

  readonly profileBtnId: string;
  readonly logoutBtnId: string;
  readonly addContactBtnId: string;

  readonly childComponents: {
    searchInputComponent: InputComponent;
    menuButton: ButtonComponent;
  };

  constructor(callbacks: TChatsHeaderComponentCallbacks) {
    super(INITIAL_STATE);

    this.callbacks = callbacks;

    this.onClickSettings = this.onClickSettings.bind(this);
    this.showAddContactModal = this.showAddContactModal.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.profileBtnId = 'PROFILE_BTN_ID';
    this.addContactBtnId = 'ADD_CONTACT_BTN_ID';
    this.logoutBtnId = 'LOGOUT_BTN_ID';

    this.childComponents = {
      searchInputComponent: new InputComponent(
        {
          fullWidth: true,
          className: 'search-input',
          name: 'search',
          placeholder: 'Поиск',
          type: 'text',
          withoutLabel: true,
        },
        {
          oninput: debounce(this.onSearch, 100),
        }
      ),
      menuButton: new ButtonComponent(
        {
          value: '',
          withIcon: 'menu',
          variant: 'pseudo',
        },
        {
          onclick: this.onClickSettings,
        }
      ),
    };
  }

  onClickSettings() {
    this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
  }

  onLogout() {
    AuthController.logout();
  }

  onGoToProfile() {
    router.go('/profile');
  }

  registerEvents() {
    const logoutBtn = document.querySelector(`#${this.logoutBtnId}`);
    logoutBtn?.addEventListener('click', this.onLogout);

    const profileBtn = document.querySelector(`#${this.profileBtnId}`);
    profileBtn?.addEventListener('click', this.onGoToProfile);

    const addContactBtn = document.querySelector(`#${this.addContactBtnId}`);
    addContactBtn?.addEventListener('click', this.showAddContactModal);
  }

  showAddContactModal() {
    this.setState({ isSettingsOpen: false });
    const modal = new AddContactModalComponent({ onApply: this.callbacks.onAddChat });
    renderModalDOM(modal);
  }

  onSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    store.set('chatFilter', value);
  }

  render() {
    return template({
      searchInputComponent: this.childComponents.searchInputComponent.elementHtml,
      menuButton: this.childComponents.menuButton.elementHtml,
      menuBtnModifiers: this.state.isSettingsOpen ? 'is-open' : '',
      isSettingsOpen: this.state.isSettingsOpen,
      profileBtnId: this.profileBtnId,
      logoutBtnId: this.logoutBtnId,
      addContactBtnId: this.addContactBtnId,
    });
  }
}
