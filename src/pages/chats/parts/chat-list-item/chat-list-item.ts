import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './chat-list-item.hbs';
import {
  TChatListItemComponentCallbacks,
  TChatListItemComponentProps,
  TChatListItemTmpProps,
} from './chat-list-item.types';
import './chat-list-item.scss';

registerHelper('CG_chat-list-item', (options) => createTmpClassName(options, 'chat-list-item'));
registerHelper('CG_chat-list-item-modifiers', (params: { hash: Pick<TChatListItemTmpProps, 'isActive'> }) => {
  const { isActive } = params.hash;
  return `${isActive ? 'is-active' : ''}`;
});

export class ChatListItemComponent extends Component<TChatListItemComponentProps['initialState']> {
  callbacks: TChatListItemComponentCallbacks;

  constructor({ initialState, callbacks }: TChatListItemComponentProps, parentElem: string) {
    super(initialState, parentElem);

    this.callbacks = callbacks;

    this.componentDidMount = this.componentDidMount.bind(this);

    this.onClick = this.onClick.bind(this);
  }

  addEventListeners() {
    if (!this.element) {
      throw new Error(`Trying to add a listener before the element ChatListItem appears in the DOM`);
    }

    this.element.addEventListener('click', this.onClick);
  }

  onClick(event: Event) {
    this.callbacks.onclick(event, this);
  }

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate() {
    this.addEventListeners();
  }

  render() {
    return template(this.state);
  }
}
