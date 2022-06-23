import { registerHelper } from 'handlebars';

import { createTmpClassName, renderArrayOfComponentsDOM, renderComponentDOM } from 'src/utils';
import { Component } from 'src/modules';

import template from './chats.hbs';
import { ChatListItemComponent, TChatListItemTmpProps, MessagesComponent } from './parts';
import { TChatsComponentState } from './chats.types';
import './parts';
import './chats.scss';
import { ChatsApi } from '../../api/chats-api';
import { ChatsHeaderComponent } from '../../components/chats-header/chats-header';
import store, { StoreEvents } from '../../store';
import { TResChat } from '../../common-types';
import { TStore } from '../../store/store.types';

registerHelper('CG_chats', (options) => createTmpClassName(options, 'chats'));

const INITIAL_STATE: TChatsComponentState = { isLoading: false, chats: [] };

export class ChatsComponent extends Component<TChatsComponentState> {
  readonly chatListId: string;
  readonly messagesId: string;
  readonly chatsHeaderId: string;

  private _meta: {
    chatComponents: ChatListItemComponent[];
    activeChatComponentId: null | number;
    messagesComponent: null | MessagesComponent;
  };

  constructor(parentElemSelector: string) {
    super(INITIAL_STATE, parentElemSelector, (state) => ({
      chats: state.chats,
    }));

    this.chatListId = 'CHATS_LIST';
    this.messagesId = 'CHATS_MESSAGES';
    this.chatsHeaderId = 'CHATS_HEADER';

    this.onChatClick = this.onChatClick.bind(this);

    this._meta = {
      chatComponents: [],
      activeChatComponentId: null,
      messagesComponent: null,
    };

    store.on(StoreEvents.Updated, () => {
      // при обновлении получаем новое состояние
      const newState = this.mapState(store.getState());

      // если что-то из используемых данных поменялось, обновляем компонент
      if (JSON.stringify(newState.chats) !== JSON.stringify(this.state.chats)) {
        this.setState({ ...newState });
      }
    });
  }

  mapState(state: TStore) {
    return {
      chats: state.chats,
    };
  }

  getChats() {
    this.setState({ isLoading: true });
    ChatsApi.getChats().then((res: any) => {
      this.setState({ isLoading: false });
      store.set('chats', JSON.parse(res.response));
    });
  }

  componentDidMount() {
    this.getChats();
  }

  componentDidUpdate() {
    this.showChatList();
    this.showMessages();
    this.showChatsHeader();
  }

  onChatClick(_event: Event, chatComponent: Component<TChatListItemTmpProps>) {
    if (chatComponent.state.id === this._meta.activeChatComponentId) {
      return;
    }

    if (this._meta.activeChatComponentId) {
      const prevActiveComponent = this._meta.chatComponents.find(
        (chat) => chat.state.id === this._meta.activeChatComponentId
      );
      if (prevActiveComponent) {
        prevActiveComponent.setState({ isActive: false });
      }
    }

    this._meta.activeChatComponentId = chatComponent.state.id;
    chatComponent.setState({ isActive: true });

    if (this._meta.messagesComponent) {
      this._meta.messagesComponent.setState({ selectedChat: chatComponent.state.id });
    } else {
      throw new Error('Не сохранен в this._meta.messagesComponent компонент');
    }
  }

  showChatList() {
    const listParentElemSelector = `#${this.chatListId}`;
    this._meta.chatComponents = [];
    this.state.chats?.forEach((chat: TResChat) => {
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

  showChatsHeader() {
    const ChatsHeader = new ChatsHeaderComponent(`#${this.chatsHeaderId}`);
    renderComponentDOM(ChatsHeader);
  }

  componentUnmount() {
    this._meta.chatComponents = [];
    this._meta.messagesComponent = null;
  }

  render() {
    return template({
      listId: this.chatListId,
      messagesId: this.messagesId,
      isLoading: !!this.state.isLoading,
      chatsHeaderId: this.chatsHeaderId,
    });
  }
}
