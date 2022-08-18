import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';
import { ChatsController } from 'src/controllers';

import template from './chats.hbs';
import { ChatListComponent, MessagesComponent, ChatsHeaderComponent, ChatListItemComponent } from './parts';
import { TChatsComponentState } from './chats.types';
import './chats.scss';

registerHelper('CG_chats', (options) => createTmpClassName(options, 'chats'));

const INITIAL_STATE: TChatsComponentState = { isLoading: true };

export class ChatsComponent extends Component<TChatsComponentState> {
  readonly childComponents: {
    chatsHeaderComponent: ChatsHeaderComponent;
    messagesComponent: MessagesComponent;
    chatListComponent?: ChatListComponent;
  };

  constructor() {
    super(INITIAL_STATE);

    this.onChatClick = this.onChatClick.bind(this);
    this.getChats = this.getChats.bind(this);

    this.childComponents = {
      chatsHeaderComponent: new ChatsHeaderComponent({
        onAddChat: this.getChats,
      }),
      chatListComponent: undefined,
      messagesComponent: new MessagesComponent(),
    };
  }

  getChats() {
    this.setState({ isLoading: true });
    ChatsController.getChats().then((chats) => {
      this.childComponents.chatListComponent = new ChatListComponent({ chats }, { onChatClick: this.onChatClick });
      this.setState({
        isLoading: false,
      });
    });
  }

  componentDidMount() {
    this.getChats();
  }

  onChatClick(_event: Event, chatComponent: ChatListItemComponent) {
    this.childComponents.messagesComponent.setState({
      selectedChatId: chatComponent.state.id,
      isLoading: true,
      companion: {
        name: chatComponent.state.individualChatName,
        avatar: chatComponent.state.individualChatAvatar,
      },
    });
  }

  render() {
    return template({
      chatListComponent: this.childComponents.chatListComponent?.elementHtml || '',
      messagesComponent: this.childComponents.messagesComponent.elementHtml,
      chatsHeaderComponent: this.childComponents.chatsHeaderComponent.elementHtml,
      isLoading: !!this.state.isLoading,
    });
  }
}
