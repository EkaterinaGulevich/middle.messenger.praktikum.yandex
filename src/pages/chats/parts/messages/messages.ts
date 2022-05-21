import { registerHelper } from 'handlebars';

import { createTmpClassName, renderArrayOfComponentsDOM } from 'src/utils';
import { Component } from 'src/modules';
import { MOCK_MESSAGE_GROUP_LIST } from 'src/mocks';

import template from './messages.hbs';
import { TMessagesComponentState } from './messages.types';
import { MessageGroupByDateComponent } from '../message-group-by-date/message-group-by-date';
import { TMessageGroupByDateTmpProps } from '../message-group-by-date/message-group-by-date.types';
import './messages.scss';

registerHelper('CG_messages', (options) => createTmpClassName(options, 'messages'));

const MOCK_REQUEST_DELAY = 1000;

const INITIAL_STATE: TMessagesComponentState = {
  isLoading: false,
  selectedChat: null,
  messageGroups: [],
};

export class MessagesComponent extends Component<TMessagesComponentState> {
  readonly messageGroupsId: string;

  constructor(parentElem: string) {
    super(INITIAL_STATE, parentElem);

    this.messageGroupsId = 'MESSAGES_GROUPS';
  }

  getMessageGroups() {
    // симуляция запроса
    this.setState({ isLoading: true, messageGroups: [] });

    setTimeout(() => {
      if (this.state.selectedChat) {
        this.setState({ messageGroups: MOCK_MESSAGE_GROUP_LIST[this.state.selectedChat] || [], isLoading: false });
      }
    }, MOCK_REQUEST_DELAY);
  }

  componentDidUpdate(prevState: TMessagesComponentState) {
    if (this.state.selectedChat) {
      if (this.state.selectedChat !== prevState.selectedChat) {
        this.getMessageGroups();
      }

      if (!this.state.isLoading && this.state.messageGroups.length) {
        this.showMessageGroupList(this.state.messageGroups);
      }
    }
  }

  showMessageGroupList(list: TMessageGroupByDateTmpProps[]) {
    const components: MessageGroupByDateComponent[] = [];
    const listParentElemSelector = `#${this.messageGroupsId}`;
    list.forEach((messageGroup) => {
      const MessageGroup = new MessageGroupByDateComponent(listParentElemSelector, messageGroup);
      components.push(MessageGroup);
    });
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
    });
  }
}
