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
    let date = new Date(this.state.date).toLocaleString().slice(0,10);


    const todayTime = new Date();
    const todayDay = todayTime.toLocaleString().slice(0,10)
    if (todayDay === date) {
      date = 'Сегодня';
    }
    return template({
      date: date,
      messages: [...this.state.messages].reverse(),
    });
  }
}
