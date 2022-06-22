import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './chat-list-item.hbs';
import {
  TChatListItemComponentCallbacks,
  TChatListItemComponentState,
  TChatListItemTmpProps,
} from './chat-list-item.types';
import './chat-list-item.scss';
import { TMessageTmpProps } from '../../../../components/message/message.types';
import { getMonth } from '../../../../utils/get-month';

registerHelper('CG_chat-list-item', (options) => createTmpClassName(options, 'chat-list-item'));
registerHelper('CG_chat-list-item-modifiers', (params: { hash: Pick<TChatListItemTmpProps, 'isActive'> }) => {
  const { isActive } = params.hash;
  return `${isActive ? 'is-active' : ''}`;
});

registerHelper('getDate', (params: { hash: Pick<TMessageTmpProps, 'time'> }) => {
  const { time } = params.hash;
  const date = new Date(time);
  return date.getHours() + ':' + date.getMinutes();
});

export class ChatListItemComponent extends Component<TChatListItemComponentState> {
  callbacks: TChatListItemComponentCallbacks;

  constructor(
    parentElem: string,
    initialState: TChatListItemComponentState,
    callbacks: TChatListItemComponentCallbacks
  ) {
    super(initialState, parentElem);

    this.callbacks = callbacks;

    this.onClick = this.onClick.bind(this);
  }

  addEventListeners() {
    if (!this.element) {
      throw new Error(`Trying to add a listener before the element ChatListItem appears in the DOM`);
    }

    this.element.addEventListener('click', this.onClick);
  }

  onClick(event: Event) {
    this.callbacks.onclick(event, this);
  }

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate() {
    this.addEventListeners();
  }

  render() {
    let date = '';
    if (this.state.last_message?.time) {
      const time = new Date(this.state.last_message.time);
      date = time.getDay() + ' ' + getMonth(time.getMonth());
    }
    return template({ ...this.state, date });
  }
}
