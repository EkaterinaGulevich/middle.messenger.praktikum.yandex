import { registerHelper } from 'handlebars';

import { TCG } from '../../utils/CG';

import template from './not-found.hbs';
import './not-found.scss';

registerHelper('CG_not_found_page', (options) =>
  TCG(options, 'not_found_page')
);

export const NotFoundPageTpl = template;
