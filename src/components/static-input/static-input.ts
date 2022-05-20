import { registerHelper, registerPartial } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './static-input.hbs';
import './static-input.scss';

registerPartial('static-input', template);

registerHelper('CG_static-input', (options) => createTmpClassName(options, 'static-input'));

export const StaticInputTpl = template;
