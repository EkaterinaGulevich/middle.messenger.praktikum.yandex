import { registerHelper, registerPartial } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './message.hbs';
import './message.scss';
import { TMessageTmpProps } from './message.types';
import store from '../../store/store';

registerPartial('message', template);

registerHelper('CG_message', (options) => createTmpClassName(options, 'message'));

registerHelper('getTime', (params: { hash: Pick<TMessageTmpProps, 'time'> }) => {
  const { time } = params.hash;
  const date = new Date(time);

  const hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
  const min = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();

  return hours + ':' + min;
});

registerHelper('isFromMe', (params: { hash: Pick<TMessageTmpProps, 'user_id'> }) => {
  const meId = store.getState().userId;
  // eslint-disable-next-line camelcase
  const { user_id } = params.hash;
  // eslint-disable-next-line camelcase
  return meId === user_id;
});

registerHelper('transformLink', (params: { hash: Pick<TMessageTmpProps, 'text'> }) => {
  const { text } = params.hash;
  const a = text.replace(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
    ($1) => `<a href=${$1}>${$1}</a>`
  );

  return a;
});

registerHelper('CG_message-modifiers', (params: { hash: Pick<TMessageTmpProps, 'fromMe' | 'isRead'> }) => {
  const { fromMe, isRead } = params.hash;
  return `${fromMe ? 'from-me' : ''} ${isRead ? 'is-read' : 'is-not-read'}`;
});

export const MessageTpl = template;
