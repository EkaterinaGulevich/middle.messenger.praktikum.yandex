import { registerPartial, registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './textarea.hbs';
import './textarea.scss';

registerPartial('textarea', template);

registerHelper('CG_textarea', (options) => createTmpClassName(options, 'textarea'));

export const TextareaTpl = template;
