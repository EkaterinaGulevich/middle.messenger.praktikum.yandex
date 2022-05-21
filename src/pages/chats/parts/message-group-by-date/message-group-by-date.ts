import { registerHelper, registerPartial } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './message-group-by-date.hbs';
import './message-group-by-date.scss';
import { TMessageGroupByDateComponentState } from './message-group-by-date.types';

registerPartial('message-group-by-date', template);

registerHelper('CG_message-group-by-date', (options) => createTmpClassName(options, 'message-group-by-date'));

export class MessageGroupByDateComponent extends Component<TMessageGroupByDateComponentState> {
  constructor(parentElem: string, initialState: TMessageGroupByDateComponentState) {
    super(initialState, parentElem);
  }

  render() {
    return template(this.state);
  }
}
