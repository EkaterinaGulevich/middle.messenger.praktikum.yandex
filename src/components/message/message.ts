import { registerHelper, registerPartial } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './message.hbs';
import './message.scss';
import { TMessageTmpProps } from './message.types';

registerPartial('message', template);

registerHelper('CG_message', (options) => createTmpClassName(options, 'message'));

registerHelper('CG_message-modifiers', (params: { hash: Pick<TMessageTmpProps, 'fromMe' | 'isRead'> }) => {
  const { fromMe, isRead } = params.hash;
  return `${fromMe ? 'from-me' : ''} ${isRead ? 'is-read' : 'is-not-read'}`;
});

export const MessageTpl = template;
