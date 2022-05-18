import { registerHelper, registerPartial } from 'handlebars';

import { TCG } from 'src/utils/CG';

import template from './chat-list-item.hbs';
import { ChatListItemProps } from './chat-list-item.types';
import './chat-list-item.scss';
import { Component } from '../../../../modules/component';

registerPartial('chat-list-item', template);

registerHelper('CG_chat-list-item', (options) => TCG(options, 'chat-list-item'));

registerHelper('CG_chat-list-item-modifiers', (params: { hash: Pick<ChatListItemProps, 'isActive'> }) => {
  const { isActive } = params.hash;
  return `${isActive ? 'is-active' : ''}`;
});

type TCallbacks = {
  onclick: (_event: Event, _component: Component<ChatListItemProps>) => void;
};

export class ChatListItem extends Component<ChatListItemProps> {
  callbacks: TCallbacks;

  constructor(props: ChatListItemProps, parentElem: string, callbacks: TCallbacks) {
    super(props, parentElem);

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
    return template(this.props);
  }
}
