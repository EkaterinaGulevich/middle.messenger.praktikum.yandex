import { registerHelper } from 'handlebars';

import { createTmpClassName, renderArrayOfComponentsDOM } from 'src/utils';
import { Component } from 'src/modules';

import template from './messages.hbs';
import { TMessagesComponentState } from './messages.types';
import { MessageGroupByDateComponent } from '../message-group-by-date/message-group-by-date';
import { TMessageGroupByDateTmpProps } from '../message-group-by-date/message-group-by-date.types';
import './messages.scss';
import { ChatsApi } from '../../../../api/chats-api';
import { AuthApi } from '../../../../api';
import store, { StoreEvents } from '../../../../store';
import { TStore } from '../../../../store/store.types';

registerHelper('CG_messages', (options) => createTmpClassName(options, 'messages'));

const INITIAL_STATE: TMessagesComponentState = {
  isLoading: false,
  selectedChat: null,
  messageGroups: [],
  listMessages: [],
};

export class MessagesComponent extends Component<TMessagesComponentState> {
  readonly messageGroupsId: string;
  readonly textareaId: string;
  private socket?: WebSocket;

  constructor(parentElem: string) {
    super(INITIAL_STATE, parentElem);

    this.addEvents = this.addEvents.bind(this);
    this.createSocket = this.createSocket.bind(this);
    this.onSendBtnClick = this.onSendBtnClick.bind(this);

    this.messageGroupsId = 'MESSAGES_GROUPS';
    this.textareaId = 'TEXTAREA_MESSAGE_ID';

    // store.on(StoreEvents.Updated, () => {
      // @ts-ignore
      // if (this.lastMesTime !== messageData[0]?.time) {
      //   // @ts-ignore
      //   this.lasMesTime = messageData[0]?.time;
      //   this.showMessageGroupList([]);
        // this.setState(this.mapState(store.getState()));
      // }

    // });

    store.on(StoreEvents.Updated, () => {

      // при обновлении получаем новое состояние
      const newState = this.mapState(store.getState());

      // если что-то из используемых данных поменялось, обновляем компонент
      if (JSON.stringify(newState.listMessages) !== JSON.stringify(this.state.listMessages)) {
        this.setState({...newState});

      }
    });
  }

  mapState(state: TStore) {
    return {
      listMessages: state.listMessages,
    };
  }

  onSendBtnClick() {
    console.log('CLICKED BTN SEND')
    // @ts-ignore
    const value = document.querySelector(`#${this.textareaId}`)?.value;

    if (!value) {
      return;
    }

    this.socket?.send(
      JSON.stringify({
        content: value,
        type: 'message',
      })
    );
    // this.socket?.send(
    //   JSON.stringify({
    //     content: '0',
    //     type: 'get old',
    //   })
    // );
  }

  // shouldComponentUpdate(prev: TMessagesComponentState, next: TMessagesComponentState) {
  //   if (JSON.stringify(prev) !== JSON.stringify(next)) {
  //     console.warn('STATE DIFFERENT')
  //     return true
  //   }
  //   // @ts-ignore
  //
  //   if (this.prevlasMesTime !== this.lasMesTime) {
  //     console.warn('LAST MES DIFFERENT')
  //
  //     return true
  //   }
  //   else {
  //     console.warn('NOT DIFFERENT')
  //
  //     return false
  //   }
  //
  // }

  addEvents() {
    const sendBtn = document.querySelector('#send-message-btn');
    sendBtn?.addEventListener('click', this.onSendBtnClick);
  }

  async createSocket() {
    this.setState({ isLoading: true });
    const user: any = await AuthApi.getUser();
    const userId = JSON.parse(user.response).id;
    store.set('userId', userId);
    ChatsApi.token(this.state.selectedChat || 0).then((res: any) => {
      const token = JSON.parse(res.response).token;
      const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${this.state.selectedChat}/${token}`);
      this.socket = socket;

      socket.addEventListener('open', () => {
        //@ts-ignore
        if (this.timer) {
          //@ts-ignore
          clearInterval(this.timer);
        }

       //@ts-ignore
        this.timer = setInterval(() => {
          socket.send(
            JSON.stringify({
              content: '0',
              type: 'get old',
            })
          );
        }, 1000)
        console.log('Соединение установлено');

      });

      socket.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      socket.addEventListener('message', (event) => {
        console.log('Получены данные', event);
        const messageData = JSON.parse(event.data);
        if (Array.isArray(messageData)) {
          store.set('listMessages', [{ date: 'Сегодня', messages: messageData }]);
          // @ts-ignore
          console.log(store.getState().listMessages);
        }

        // @ts-ignore
        if (this.lastMesTime !== messageData[0]?.time) {
          // @ts-ignore
          this.prevlasMesTime = this.lasMesTime;
          // @ts-ignore
          this.lasMesTime = messageData[0]?.time;
          // this.showMessageGroupList([]);
        }
        if (this.state.isLoading) {
          this.setState({ isLoading: false })
        }

      });
      socket.addEventListener('error', (event: any) => {
        console.log('Ошибка', event.message);
      });
    });
  }

  componentDidMount() {
    console.log({ selectedChat: this.state.selectedChat });
    this.addEvents();

    if (this.state.selectedChat) {

      if (!this.state.isLoading) {
        // if (!this.state.isLoading && this.state.listMessages.length) {
        this.showMessageGroupList([]);
      }
    }
  }

  componentDidUpdate(prevState: TMessagesComponentState) {
    this.addEvents();

    if (this.state.selectedChat) {
      if (this.state.selectedChat !== prevState.selectedChat) {
        this.socket?.close();
        this.createSocket();
      }

      if (!this.state.isLoading) {
        // if (!this.state.isLoading && this.state.listMessages.length) {
        this.showMessageGroupList([]);
      }
    }
  }

  showMessageGroupList(_list: TMessageGroupByDateTmpProps[]) {
    // @ts-ignore


    const storeData = store.getState().listMessages || [];

    const components: MessageGroupByDateComponent[] = [];
    const listParentElemSelector = `#${this.messageGroupsId}`;

    document.querySelector(listParentElemSelector)?.replaceChildren('');

    // (store.getState().listMessages || [])?.forEach((messageGroup: any) => {
    storeData.forEach((messageGroup: any) => {
      console.log({ messageGroup });
      const MessageGroup = new MessageGroupByDateComponent(listParentElemSelector, messageGroup);
      components.push(MessageGroup);
    });
    console.warn(components.length);

    renderArrayOfComponentsDOM(components, listParentElemSelector);

    const wrapElem = document.querySelector(`#MESSAGES_GROUPS`);
    if (wrapElem) {
      wrapElem.scrollTop = wrapElem.scrollHeight;
    }
  }

  render() {
    const { selectedChat, isLoading } = this.state;
    const messageGroupsId = this.messageGroupsId;

    return template({
      isNotSelectedChat: !selectedChat,
      messageGroupsId,
      isLoading: !!isLoading,
      textareaId: this.textareaId,
    });
  }
}
