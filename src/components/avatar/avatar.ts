import { registerHelper, registerPartial } from 'handlebars';

import { TCG } from 'src/utils/CG';

import template from './avatar.hbs';
import './avatar.scss';

registerPartial('avatar', template);

registerHelper('CG_avatar', (options) => TCG(options, 'avatar'));

export const AvatarTpl = template;
