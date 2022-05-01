import { registerHelper, registerPartial } from 'handlebars';

import { TCG } from 'src/utils/CG';

import template from './button.hbs';
import { ButtonProps } from './button.types';
import './button.scss';

registerPartial('button', template);

registerHelper('CG_button', (options) => TCG(options, 'button'));

registerHelper(
  'CG_button-modifiers',
  (params: { hash: Pick<ButtonProps, 'variant' | 'fullWidth'> }) => {
    const { variant, fullWidth } = params.hash;
    return `${variant || 'primary'}${fullWidth ? ' full-width' : ''}`;
  }
);

export const ButtonTpl = template;
