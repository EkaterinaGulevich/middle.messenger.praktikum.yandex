import { registerHelper } from 'handlebars';

import { TCG } from 'src/utils/CG';
import 'src/components';

import './parts';
import template from './chats.hbs';
import './chats.scss';
import { ChatListItem } from './parts';
import { MOCK_CHAT_LIST } from '../../mocks';
import { RenderComponentDOM } from '../../utils/renderComponentDOM';
import { Component } from '../../modules/component';
import { ChatListItemProps } from './parts/chat-list-item/chat-list-item.types';

registerHelper('CG_chats', (options) => TCG(options, 'chats'));

export const ChatsTpl = template;

type ChatsPageProps = {
  isLoading: boolean;
  list: ChatListItemProps[];
};

export class ChatsPage extends Component<ChatsPageProps> {
  readonly chatListId: string;
  readonly messagesId: string;
  private state: {
    chatComponents: ChatListItem[];
    activeChatComponentId: null | string;
  };
  constructor(props: ChatsPageProps, parentElemSelector: string) {
    super(props, parentElemSelector);

    this.chatListId = 'ChatsPage-List';
    this.messagesId = 'ChatsPage-Messages';

    this.onChatClick = this.onChatClick.bind(this);
    this.showChatList = this.showChatList.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);

    this.state = {
      chatComponents: [],
      activeChatComponentId: null,
    };
  }

  componentDidMount() {
    // симуляция запроса
    setTimeout(() => {
      this.setProps({ list: MOCK_CHAT_LIST, isLoading: false });
    }, 3000);
  }

  componentDidUpdate() {
    this.showChatList(this.props.list);
  }

  onChatClick(_event: Event, chatComponent: Component<ChatListItemProps>) {
    if (chatComponent.id === this.state.activeChatComponentId) {
      return;
    }

    if (this.state.activeChatComponentId) {
      const prevActiveComponent = this.state.chatComponents.find(
        (chat) => chat.id === this.state.activeChatComponentId
      );
      if (prevActiveComponent) {
        prevActiveComponent.setProps({ ...prevActiveComponent.props, isActive: false });
      }
    }

    this.state.activeChatComponentId = chatComponent.id;
    chatComponent.setProps({ ...chatComponent.props, isActive: true });
  }

  showChatList(list: ChatListItemProps[]) {
    list.forEach((chat) => {
      const chatItemComponent = new ChatListItem(chat, `#${this.chatListId}`, { onclick: this.onChatClick });
      this.state.chatComponents.push(chatItemComponent);
      RenderComponentDOM(chatItemComponent);
    });
  }

  render() {
    return template({ listId: this.chatListId, messagesId: this.messagesId, isLoading: this.props.isLoading });
  }
}

export const chatsPage = (parentSelector: string) => new ChatsPage({ isLoading: true, list: [] }, parentSelector);
