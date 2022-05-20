import { registerPartial, registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './input.hbs';
import { TInputTmpProps } from './input.types';
import './input.scss';

registerPartial('input', template);

registerHelper('CG_input', (options) => createTmpClassName(options, 'input'));

registerHelper('CG_input-modifiers', (params: { hash: Pick<TInputTmpProps, 'fullWidth'> }) => {
  const { fullWidth } = params.hash;
  return `${fullWidth ? ' full-width' : ''}`;
});

export const InputTpl = template;
