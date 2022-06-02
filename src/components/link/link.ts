import { registerPartial, registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './link.hbs';
import './link.scss';

registerPartial('link', template);

registerHelper('CG_link', (options) => createTmpClassName(options, 'link'));

export const LinkTpl = template;
