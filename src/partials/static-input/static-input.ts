import Handlebars from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './static-input.hbs';
import './static-input.scss';

Handlebars.registerPartial('static-input', template);

Handlebars.registerHelper('CG_static-input', (options) => createTmpClassName(options, 'static-input'));
