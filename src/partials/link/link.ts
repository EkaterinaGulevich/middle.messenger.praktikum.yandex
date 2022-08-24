import Handlebars from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './link.hbs';
import './link.scss';

Handlebars.registerPartial('link', template);

Handlebars.registerHelper('CG_link', (options) => createTmpClassName(options, 'link'));
