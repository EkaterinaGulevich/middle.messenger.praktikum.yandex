import Handlebars from 'handlebars';

import { createTmpClassName, getRelativeDate } from 'src/utils';
import { Component } from 'src/core';
import { RESOURSES_URL } from 'src/consts/common';

import template from './chat-list-item.hbs';
import {
  TChatListItemComponentCallbacks,
  TChatListItemComponentState,
  TChatListItemTmpProps,
} from 'src/pages/chats/parts';
import './chat-list-item.scss';

Handlebars.registerHelper('CG_chat-list-item', (options) => createTmpClassName(options, 'chat-list-item'));
Handlebars.registerHelper(
  'CG_chat-list-item-modifiers',
  (params: { hash: Pick<TChatListItemTmpProps, 'isActive'> }) => {
    const { isActive } = params.hash;
    return `${isActive ? 'is-active' : ''}`;
  }
);

export class ChatListItemComponent extends Component<TChatListItemComponentState> {
  callbacks: TChatListItemComponentCallbacks;

  constructor(initialState: TChatListItemComponentState, callbacks: TChatListItemComponentCallbacks) {
    super(initialState);

    this.callbacks = callbacks;

    this.onClick = this.onClick.bind(this);
  }

  registerEvents() {
    this.elementInDOM?.addEventListener('click', this.onClick);
  }

  onClick(event: Event) {
    this.callbacks.onclick(event, this);
  }

  getDate(): string {
    if (!this.state.lastMessage?.time) {
      return '';
    }

    const date = getRelativeDate(this.state.lastMessage.time || '');

    if (date === 'Сегодня') {
      const time = new Date(this.state.lastMessage.time);
      return time.toLocaleString().slice(12, 17);
    }
    return date;
  }

  render() {
    return template({
      ...this.state,
      date: this.getDate(),
      individualChatAvatar: this.state.individualChatAvatar ? `${RESOURSES_URL}${this.state.individualChatAvatar}` : '',
    });
  }
}
