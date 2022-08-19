import Handlebars from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './avatar.hbs';
import './avatar.scss';
import { TAvatarTmpProps } from './avatar.types';

Handlebars.registerPartial('avatar', template);

Handlebars.registerHelper('CG_avatar', (options) => createTmpClassName(options, 'avatar'));

Handlebars.registerHelper('CG_avatar-modifiers', (params: { hash: Pick<TAvatarTmpProps, 'size'> }) => {
  const { size } = params.hash;
  return `${size || 'big'}`;
});
