import { registerHelper, registerPartial } from 'handlebars';

import { TCG } from 'src/utils/CG';

import template from './avatar.hbs';
import './avatar.scss';
import { AvatarProps } from './avatar.types';

registerPartial('avatar', template);

registerHelper('CG_avatar', (options) => TCG(options, 'avatar'));

registerHelper(
  'CG_avatar-modifiers',
  (params: { hash: Pick<AvatarProps, 'size'> }) => {
    const { size } = params.hash;
    return `${size || 'big'}`;
  }
);

export const AvatarTpl = template;
