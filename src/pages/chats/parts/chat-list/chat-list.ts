import { Component } from 'src/core';
import { ChatsController } from 'src/controllers';
import { TIMER_TO_UPDATE } from 'src/consts/common';
import { ChatListItemComponent } from 'src/pages/chats/parts';
import { Store, store, TStore } from 'src/store';

import template from './chat-list.hbs';
import { TChatListComponentCallbacks, TChatListComponentState } from './chat-list.types';
import { isChatListChanged } from './helpers/is-chat-list-changed';

export class ChatListComponent extends Component<TChatListComponentState> {
  callbacks: TChatListComponentCallbacks;

  readonly childComponents: {
    chatListItemComponents: ChatListItemComponent[];
  };

  private _meta: {
    activeChatComponent: null | ChatListItemComponent;
    timerId?: ReturnType<typeof setInterval>;
  };

  constructor(initialState: TChatListComponentState, callbacks: TChatListComponentCallbacks) {
    super(initialState);

    this.callbacks = callbacks;

    this.onChatClick = this.onChatClick.bind(this);

    this.childComponents = {
      chatListItemComponents: this.state.chats.map(
        (chat) => new ChatListItemComponent({ ...chat }, { onclick: this.onChatClick })
      ),
    };

    this._meta = {
      activeChatComponent: null,
    };

    store.on(Store.EVENTS.UPDATE, ({ chatFilter = '' }: TStore) => {
      this.setState({ chatFilter });
    });
  }

  getChats() {
    ChatsController.getChats().then((chats) => {
      this.setState({
        chats,
      });
    });
  }

  shouldComponentUpdate(prevState: TChatListComponentState, nextState: TChatListComponentState): boolean {
    const isFilterChanged = prevState.chatFilter !== nextState.chatFilter;
    return isChatListChanged(prevState.chats, nextState.chats) || isFilterChanged;
  }

  componentDidMount() {
    this._meta.timerId = setInterval(() => this.getChats(), TIMER_TO_UPDATE);
  }

  componentUnmount() {
    clearInterval(this._meta.timerId);
    store.set('chatFilter', '');
  }

  componentWillUpdate(_nextState: TChatListComponentState) {
    this.childComponents.chatListItemComponents = this.state.chats
      .filter((chat) =>
        chat.individualChatName.toLowerCase().includes(this.state.chatFilter?.toLowerCase().trim() || '')
      )
      .map((chat) => {
        const isActive = this._meta.activeChatComponent?.state.id === chat.id;
        const comp = new ChatListItemComponent({ ...chat, isActive }, { onclick: this.onChatClick });
        if (isActive) {
          this._meta.activeChatComponent = comp;
        }
        return comp;
      });
  }

  onChatClick(_event: Event, chatComponent: ChatListItemComponent) {
    if (this._meta.activeChatComponent) {
      if (this._meta.activeChatComponent.id === chatComponent.id) {
        return;
      }

      this._meta.activeChatComponent.setState({ isActive: false });
    }

    this._meta.activeChatComponent = chatComponent;
    chatComponent.setState({ isActive: true });
    if (this.callbacks.onChatClick) {
      this.callbacks.onChatClick(_event, chatComponent);
    }
  }

  render() {
    return template({
      chatListItemComponents: this.childComponents.chatListItemComponents.map((component) => component.elementHtml),
    });
  }
}
