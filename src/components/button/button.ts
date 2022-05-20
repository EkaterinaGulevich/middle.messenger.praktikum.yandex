import { registerHelper, registerPartial } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './button.hbs';
import { TButtonTmpProps } from './button.types';
import './button.scss';

registerPartial('button', template);

registerHelper('CG_button', (options) => createTmpClassName(options, 'button'));

registerHelper('CG_button-modifiers', (params: { hash: Pick<TButtonTmpProps, 'variant' | 'fullWidth'> }) => {
  const { variant, fullWidth } = params.hash;
  return `${variant || 'primary'}${fullWidth ? ' full-width' : ''}`;
});

export const ButtonTpl = template;
