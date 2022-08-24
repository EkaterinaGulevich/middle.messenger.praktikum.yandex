import Handlebars from 'handlebars';
import { createTmpClassName } from 'src/utils';

import template from './message.hbs';
import './message.scss';
import { TMessageTmpProps } from './message.types';

Handlebars.registerPartial('message', template);

Handlebars.registerHelper('CG_message', (options) => createTmpClassName(options, 'message'));

Handlebars.registerHelper('getTime', (params: { hash: Pick<TMessageTmpProps, 'time'> }) => {
  const { time } = params.hash;
  const date = new Date(time);
  return date.toLocaleString().slice(12, 17);
});

Handlebars.registerHelper('transformLink', (params: { hash: Pick<TMessageTmpProps, 'text'> }) => {
  const { text } = params.hash;
  return text
    .trim()
    .split('\n')
    .join('<br>')
    .replace(
      // TODO: вынести в константы говорящим названием
      // eslint-disable-next-line
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      ($1) => `<a href=${$1}>${$1}</a>`
    );
});

Handlebars.registerHelper('CG_message-modifiers', (params: { hash: Pick<TMessageTmpProps, 'isFromMe' | 'isRead'> }) => {
  const { isFromMe, isRead } = params.hash;
  return `${isFromMe ? 'is-from-me' : ''} ${isRead ? 'is-read' : 'is-not-read'}`;
});
