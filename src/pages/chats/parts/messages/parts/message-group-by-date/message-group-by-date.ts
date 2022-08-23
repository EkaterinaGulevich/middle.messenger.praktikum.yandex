import Handlebars from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/core';

import { TMessageGroupByDateComponentState } from './message-group-by-date.types';
import template from './message-group-by-date.hbs';
import './message-group-by-date.scss';

Handlebars.registerHelper('CG_message-group-by-date', (options) =>
  createTmpClassName(options, 'message-group-by-date')
);

export class MessageGroupByDateComponent extends Component<TMessageGroupByDateComponentState> {
  constructor(initialState: TMessageGroupByDateComponentState) {
    super(initialState);
  }

  render() {
    return template({
      date: this.state.date,
      messages: [...this.state.messages].sort((a, b) => (a.time > b.time ? 1 : -1)),
    });
  }
}
