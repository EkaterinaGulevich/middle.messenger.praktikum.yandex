import { registerHelper, registerPartial } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './avatar.hbs';
import './avatar.scss';
import { TAvatarTmpProps } from './avatar.types';

registerPartial('avatar', template);

registerHelper('CG_avatar', (options) => createTmpClassName(options, 'avatar'));

registerHelper('CG_avatar-modifiers', (params: { hash: Pick<TAvatarTmpProps, 'size'> }) => {
  const { size } = params.hash;
  return `${size || 'big'}`;
});

export const AvatarTpl = template;
