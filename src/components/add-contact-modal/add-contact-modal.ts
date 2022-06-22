import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './add-contact-modal.hbs';
import { TAddContactModalComponentState } from './add-contact-modal.types';
import './add-contact-modal.scss';
import { TInputComponentCallbacks } from '../input/input.types';
import { InputComponent } from '../input/input';
import { renderComponentDOM } from '../../utils';
import { UserApi } from '../../api/user-api';
import { ChatsApi } from '../../api/chats-api';
import { AuthApi } from '../../api';

registerHelper('CG_modal', (options) => createTmpClassName(options, 'modal'));

const INITIAL_STATE: TAddContactModalComponentState = {};

export class AddContactModalComponent extends Component<TAddContactModalComponentState> {
  readonly loginInputId: string;
  readonly addBtnId: string;
  readonly cancelBtnId: string;
  meta: { loginText: string; loginInput: InputComponent | null };
  onApply: () => void;

  constructor(parentElem: string, onApply: () => void) {
    super(INITIAL_STATE, parentElem, () => ({}));

    this.onApply = onApply;

    this.loginInputId = 'LOGIN_INPUT_ID';
    this.addBtnId = 'ADD_BTN_ID';
    this.cancelBtnId = 'CANCEL_BTN_ID';
    this.meta = {
      loginText: '',
      loginInput: null,
    };
  }

  async addEvents() {
    const meId = await AuthApi.getUser().then((res: any) => JSON.parse(res.response).id);

    const cancelBtn = document.querySelector(`#${this.cancelBtnId}`);
    cancelBtn?.addEventListener('click', () => {
      this.eventBus.emit(Component.EVENTS.FLOW_CU);
    });

    const addBtn = document.querySelector(`#${this.addBtnId}`);
    addBtn?.addEventListener('click', () => {
      UserApi.search(this.meta.loginText).then((res: any) => {
        const users = JSON.parse(res.response);
        const user = users.find((u: any) => u.login === this.meta.loginText);
        if (user) {
          ChatsApi.createChat({ title: [user.second_name, user.first_name].join(' ') }).then((chatRes: any) => {
            const chatId = JSON.parse(chatRes.response).id;
            ChatsApi.addUsersToChat({ chatId, users: [user.id, meId] }).then(() => {
              this.onApply();
              this.eventBus.emit(Component.EVENTS.FLOW_CU);
            });
          });
        } else {
          this.meta.loginInput?.setState({
            error: `Пользователь ${this.meta.loginText} не найден`,
          });
        }
      });
    });
  }

  componentDidMount() {
    this.addEvents();
    this.renderSearchInput();
  }

  componentDidUpdate() {
    //
  }

  renderSearchInput() {
    const callbacks: TInputComponentCallbacks = {
      blur: (e) => {
        // @ts-ignore
        this.meta.loginText = e.target.value;
      },
    };
    const loginInput = new InputComponent(
      `#${this.loginInputId}`,
      {
        fullWidth: true,
        className: 'login-input',
        name: 'login',
        placeholder: 'Введите логин',
        type: 'text',
      },
      callbacks
    );
    this.meta.loginInput = loginInput;
    renderComponentDOM(loginInput);
  }

  render() {
    return template({
      loginInputId: this.loginInputId,
      addBtnId: this.addBtnId,
      cancelBtnId: this.cancelBtnId,
    });
  }
}
