import { registerHelper } from 'handlebars';

import { createTmpClassName, renderArrayOfComponentsDOM, renderComponentDOM } from 'src/utils';
import { MOCK_CHAT_LIST } from 'src/mocks';
import { Component } from 'src/modules';

import template from './chats.hbs';
import { ChatListItemComponent, TChatListItemTmpProps, MessagesComponent } from './parts';
import { TChatsComponentState } from './chats.types';
import './parts';
import './chats.scss';

registerHelper('CG_chats', (options) => createTmpClassName(options, 'chats'));

const MOCK_REQUEST_DELAY = 1000;

const INITIAL_STATE: TChatsComponentState = { isLoading: false };

export class ChatsComponent extends Component<TChatsComponentState> {
  readonly chatListId: string;
  readonly messagesId: string;

  private _meta: {
    chatComponents: ChatListItemComponent[];
    activeChatComponentId: null | string;
    messagesComponent: null | MessagesComponent;
    messagesData: TChatListItemTmpProps[];
  };

  constructor(parentElemSelector: string) {
    super(INITIAL_STATE, parentElemSelector);

    this.chatListId = 'CHATS_LIST';
    this.messagesId = 'CHATS_MESSAGES';

    this.onChatClick = this.onChatClick.bind(this);

    this._meta = {
      messagesData: [],
      chatComponents: [],
      activeChatComponentId: null,
      messagesComponent: null,
    };
  }

  getChats() {
    this.setState({ isLoading: true });
    // симуляция запроса
    setTimeout(() => {
      this._meta.messagesData = MOCK_CHAT_LIST;
      this.setState({ isLoading: false });
    }, MOCK_REQUEST_DELAY);
  }

  componentDidMount() {
    this.getChats();
  }

  componentDidUpdate() {
    this.showChatList(this._meta.messagesData);
    this.showMessages();
  }

  onChatClick(_event: Event, chatComponent: Component<TChatListItemTmpProps>) {
    if (chatComponent.id === this._meta.activeChatComponentId) {
      return;
    }

    if (this._meta.activeChatComponentId) {
      const prevActiveComponent = this._meta.chatComponents.find(
        (chat) => chat.id === this._meta.activeChatComponentId
      );
      if (prevActiveComponent) {
        prevActiveComponent.setState({ isActive: false });
      }
    }

    this._meta.activeChatComponentId = chatComponent.id;
    chatComponent.setState({ isActive: true });

    if (this._meta.messagesComponent) {
      this._meta.messagesComponent.setState({ selectedChat: chatComponent.state.id });
    } else {
      throw new Error('Не сохранен в this._meta.messagesComponent компонент');
    }
  }

  showChatList(list: TChatListItemTmpProps[]) {
    const listParentElemSelector = `#${this.chatListId}`;
    list.forEach((chat) => {
      const ChatListItem = new ChatListItemComponent(listParentElemSelector, chat, {
        onclick: this.onChatClick,
      });
      this._meta.chatComponents.push(ChatListItem);
    });
    renderArrayOfComponentsDOM(this._meta.chatComponents, listParentElemSelector);
  }

  showMessages() {
    const Messages = new MessagesComponent(`#${this.messagesId}`);
    this._meta.messagesComponent = Messages;
    renderComponentDOM(Messages);
  }

  render() {
    return template({
      listId: this.chatListId,
      messagesId: this.messagesId,
      isLoading: !!this.state.isLoading,
    });
  }
}

export const createChats = (parentSelector: string) => new ChatsComponent(parentSelector);
