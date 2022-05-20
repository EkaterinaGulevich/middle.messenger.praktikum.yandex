import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './not-found.hbs';
import './not-found.scss';

registerHelper('CG_not_found_page', (options) => createTmpClassName(options, 'not_found_page'));

export const NotFoundPageTpl = template;
