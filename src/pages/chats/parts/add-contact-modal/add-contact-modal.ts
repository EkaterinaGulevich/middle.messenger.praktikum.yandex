import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';
import { ButtonComponent } from 'src/components/button/button';
import { ChatsController } from 'src/controllers';
import { InputComponent } from 'src/components/input/input'

import template from './add-contact-modal.hbs';
import { TAddContactModalCallbacks, TAddContactModalComponentState } from './add-contact-modal.types';
import './add-contact-modal.scss';

registerHelper('CG_modal', (options) => createTmpClassName(options, 'modal'));

const INITIAL_STATE: TAddContactModalComponentState = {};

export class AddContactModalComponent extends Component<TAddContactModalComponentState> {
  childComponents: {
    addButton: ButtonComponent;
    cancelButton: ButtonComponent;
    loginInput: InputComponent;
  };

  meta: { loginValue: string };
  callbacks: TAddContactModalCallbacks;

  constructor(callbacks: TAddContactModalCallbacks) {
    super(INITIAL_STATE);

    this.callbacks = callbacks;

    this.hideModal = this.hideModal.bind(this);
    this.onAdd = this.onAdd.bind(this);

    this.meta = {
      loginValue: '',
    };

    this.childComponents = {
      addButton: new ButtonComponent(
        {
          value: 'Добавить',
          fullWidth: true,
        },
        {
          onclick: this.onAdd,
        }
      ),
      cancelButton: new ButtonComponent(
        {
          value: 'Отмена',
          variant: 'secondary',
          fullWidth: true,
        },
        {
          onclick: this.hideModal,
        }
      ),
      loginInput: new InputComponent(
        {
          fullWidth: true,
          className: 'login-input',
          name: 'login',
          placeholder: 'Введите логин',
          type: 'text',
        },
        {
          onblur: (event) => {
            const target = event.target as HTMLInputElement;
            this.meta.loginValue = target.value;
          },
        }
      ),
    };
  }

  hideModal() {
    this.eventBus.emit(Component.EVENTS.FLOW_CU);
  }

  onAdd() {
    ChatsController.createChat(this.meta.loginValue)
      .then(() => {
        this.callbacks.onApply();
        this.hideModal();
      })
      .catch((error) => {
        this.childComponents.loginInput.setState({ error: error.message });
      });
  }

  render() {
    return template({
      loginInput: this.childComponents.loginInput.elementHtml,
      addButton: this.childComponents.addButton.elementHtml,
      cancelButton: this.childComponents.cancelButton.elementHtml,
    });
  }
}
