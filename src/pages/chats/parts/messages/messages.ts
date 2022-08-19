import Handlebars from 'handlebars';

import { createClassName, createTmpClassName, groupMessageByDate } from 'src/utils';
import { Component } from 'src/modules';
import { ButtonComponent, TextareaComponent } from 'src/components';
import { ChatsController } from 'src/controllers';
import { TMessageResponse, TNewMessageResponse, isDataMessageResponse } from 'src/types';
import { SOCKET_CONNECTION_BREAK_CODE, SOCKET_WAS_CLOSED_CODE } from 'src/consts/socket-statuses';
import { GET_OLD_MESSAGES_COUNT, RESOURSES_URL } from 'src/consts/common';

import { MessageGroupByDateComponent } from './parts';
import { TMessagesComponentState } from './messages.types';
import template from './messages.hbs';
import './messages.scss';

const BASE_CLASS_NAME = 'messages';

Handlebars.registerHelper('CG_messages', (options) => createTmpClassName(options, BASE_CLASS_NAME));

const INITIAL_STATE: TMessagesComponentState = {
  isLoading: false,
  selectedChatId: null,
  groupsOfMessages: [],
};

export class MessagesComponent extends Component<TMessagesComponentState> {
  readonly messageGroupsWrapperId: string;

  childComponents: {
    clipButton: ButtonComponent;
    sendButton: ButtonComponent;
    messageGroups: MessageGroupByDateComponent[];
    messageTextarea: TextareaComponent;
  };

  private _meta: {
    socket?: WebSocket;
    newMessageValue: string;
    isNeedAppearAnimation: boolean;
    loadedMessageCount: number;
    allMessageLoaded: boolean;
    readMessagesContainerHeight: number;
    saveScroll: boolean;
  };

  constructor() {
    super(INITIAL_STATE);

    this.messageGroupsWrapperId = 'MESSAGES_GROUPS';

    this.openSocket = this.openSocket.bind(this);
    this.onSocketOpened = this.onSocketOpened.bind(this);
    this.onSocketMessage = this.onSocketMessage.bind(this);
    this.onSocketClosed = this.onSocketClosed.bind(this);
    this.onSendBtnClick = this.onSendBtnClick.bind(this);
    this.onScrollMessage = this.onScrollMessage.bind(this);
    this.resetDataWhenChatChanged = this.resetDataWhenChatChanged.bind(this);

    this.childComponents = {
      messageGroups: [],
      messageTextarea: new TextareaComponent(
        {
          placeholder: 'Сообщение',
          name: 'message',
        },
        {
          onblur: (e) => {
            const target = e.target as HTMLTextAreaElement;
            this._meta.newMessageValue = target.value;
          },
        }
      ),
      clipButton: new ButtonComponent({
        withIcon: 'clip',
        variant: 'pseudo',
        // TODO: добавить возможность отправлять в чат файлы
        disabled: true,
        className: createClassName(BASE_CLASS_NAME, 'btn-clip'),
        value: '',
      }),
      sendButton: new ButtonComponent(
        {
          withIcon: 'send',
          variant: 'pseudo',
          className: createClassName(BASE_CLASS_NAME, 'btn-send'),
          value: '',
        },
        {
          onclick: this.onSendBtnClick,
        }
      ),
    };

    this._meta = {
      socket: undefined,
      newMessageValue: '',
      isNeedAppearAnimation: true,
      loadedMessageCount: 0,
      allMessageLoaded: false,
      readMessagesContainerHeight: 0,
      saveScroll: false,
    };
  }

  onSendBtnClick() {
    if (!this._meta.newMessageValue || !this._meta.socket) {
      return;
    }

    this._meta.socket?.send(
      JSON.stringify({
        content: this._meta.newMessageValue,
        type: 'message',
      })
    );
  }

  onSocketOpened(socket: WebSocket) {
    this._meta.socket = socket;
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    );
  }

  onSocketClosed({ code }: { code: number }) {
    if (code === SOCKET_CONNECTION_BREAK_CODE) {
      this.openSocket();
    }
  }

  onSocketMessage(response: TNewMessageResponse | TMessageResponse[]) {
    if (isDataMessageResponse(response)) {
      // Если пришел массив последних сообщений (get old)

      const groupsWrapElem = document.querySelector(`#${this.messageGroupsWrapperId}`) as HTMLDivElement;
      this._meta.readMessagesContainerHeight = groupsWrapElem?.scrollHeight;

      const groupsOfMessages = groupMessageByDate(response, this.state.groupsOfMessages);
      this.childComponents.messageGroups = groupsOfMessages.map(
        (mesGroup) => new MessageGroupByDateComponent(mesGroup)
      );

      this.setState({ groupsOfMessages, isLoading: false });

      if (response.length === 0) {
        this._meta.allMessageLoaded = true;
      }
    } else {
      // Если пришло 1 новое сообщение

      this._meta.saveScroll = false;
      this._meta.isNeedAppearAnimation = false;

      this._meta.socket?.send(
        JSON.stringify({
          content: `0`,
          type: 'get old',
        })
      );
      this._meta.loadedMessageCount += 1;
    }
  }

  onScrollMessage(event: Event) {
    const target = event.target as HTMLDivElement;
    if (target.scrollTop === 0 && !this._meta.allMessageLoaded) {
      this._meta.saveScroll = true;
      this._meta.socket?.send(
        JSON.stringify({
          content: `${this._meta.loadedMessageCount + GET_OLD_MESSAGES_COUNT}`,
          type: 'get old',
        })
      );
      this._meta.loadedMessageCount += GET_OLD_MESSAGES_COUNT;
    }
  }

  resetDataWhenChatChanged() {
    this._meta.loadedMessageCount = 0;
    this._meta.allMessageLoaded = false;
    this._meta.readMessagesContainerHeight = 0;
    this._meta.isNeedAppearAnimation = true;
    this._meta.saveScroll = false;

    this.childComponents.messageGroups = [];

    this._meta.socket?.close(SOCKET_WAS_CLOSED_CODE, 'Был открыт другой чат');

    this.setState({ groupsOfMessages: [] });
  }

  componentUnmount() {
    this._meta.socket?.close(SOCKET_WAS_CLOSED_CODE, 'Чат был закрыт');
  }

  openSocket() {
    if (!this.state.selectedChatId) {
      return;
    }
    ChatsController.createSocket(
      { chatId: this.state.selectedChatId },
      {
        onOpen: this.onSocketOpened,
        onMessage: this.onSocketMessage,
        onClose: this.onSocketClosed,
      }
    );
  }

  componentDidUpdate(prevState: TMessagesComponentState) {
    if (this.state.selectedChatId) {
      if (this.state.selectedChatId !== prevState.selectedChatId) {
        this.resetDataWhenChatChanged();
        this.openSocket();
      }

      const groupsWrapElem = document.querySelector(`#${this.messageGroupsWrapperId}`) as HTMLDivElement;

      if (groupsWrapElem) {
        if (!this._meta.saveScroll) {
          groupsWrapElem.scrollTop = groupsWrapElem.scrollHeight;
          this._meta.isNeedAppearAnimation = false;
        } else {
          groupsWrapElem.scrollTop = groupsWrapElem.scrollHeight - this._meta.readMessagesContainerHeight;
        }
        groupsWrapElem.onscroll = this.onScrollMessage;
      }
    }
  }

  render() {
    const { avatar, name = '' } = this.state.companion || {};
    const companionAvatar = avatar ? `${RESOURSES_URL}${avatar}` : '';

    return template({
      isSelectedChat: !!this.state.selectedChatId,
      isLoading: this.state.isLoading,
      clipButton: this.childComponents.clipButton.elementHtml,
      sendButton: this.childComponents.sendButton.elementHtml,
      messageGroups: this.childComponents.messageGroups.map((comp) => comp.elementHtml).reverse(),
      messageGroupsWrapperId: this.messageGroupsWrapperId,
      messageTextarea: this.childComponents.messageTextarea.elementHtml,
      companion: { name, avatar: companionAvatar },
      messageGroupsWrapperModifiers: this._meta.isNeedAppearAnimation ? 'with-animation' : '',
    });
  }
}
