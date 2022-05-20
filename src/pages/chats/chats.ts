import { registerHelper } from 'handlebars';

import { createTmpClassName, renderArrayOfComponentsDOM } from 'src/utils';
import { MOCK_CHAT_LIST } from 'src/mocks';
import { Component } from 'src/modules';

import template from './chats.hbs';
import { ChatListItemComponent, TChatListItemTmpProps } from './parts';
import { TChatsComponentProps } from './chats.types';
import './parts';
import './chats.scss';

registerHelper('CG_chats', (options) => createTmpClassName(options, 'chats'));

export class ChatsComponent extends Component<TChatsComponentProps['initialState']> {
  readonly chatListId: string;
  readonly messagesId: string;

  private _meta: {
    chatComponents: ChatListItemComponent[];
    activeChatComponentId: null | string;
  };

  constructor({ initialState }: TChatsComponentProps, parentElemSelector: string) {
    super(initialState, parentElemSelector);

    this.chatListId = 'CHATS_LIST';
    this.messagesId = 'CHATS_MESSAGES';

    this.onChatClick = this.onChatClick.bind(this);

    this._meta = {
      chatComponents: [],
      activeChatComponentId: null,
    };
  }

  getChats() {
    // симуляция запроса
    setTimeout(() => {
      this.setState({ list: MOCK_CHAT_LIST, isLoading: false });
    }, 3000);
  }

  componentDidMount() {
    this.getChats();
  }

  componentDidUpdate() {
    this.showChatList(this.state.list);
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
  }

  showChatList(list: TChatListItemTmpProps[]) {
    const listParentElemSelector = `#${this.chatListId}`;
    list.forEach((chat) => {
      const ChatListItem = new ChatListItemComponent(
        {
          initialState: chat,
          callbacks: {
            onclick: this.onChatClick,
          },
        },
        listParentElemSelector
      );
      this._meta.chatComponents.push(ChatListItem);
    });
    renderArrayOfComponentsDOM(this._meta.chatComponents, listParentElemSelector);
  }

  render() {
    return template({
      listId: this.chatListId,
      messagesId: this.messagesId,
      isLoading: this.state.isLoading,
    });
  }
}

export const createChats = (parentSelector: string) =>
  new ChatsComponent(
    {
      initialState: {
        isLoading: true,
        list: [],
      },
    },
    parentSelector
  );
