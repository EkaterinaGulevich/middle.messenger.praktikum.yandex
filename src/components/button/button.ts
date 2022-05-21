import { registerHelper, registerPartial } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './button.hbs';
import { TButtonTmpProps } from './button.types';
import './button.scss';

registerPartial('button', template);

registerHelper('CG_button', (options) => createTmpClassName(options, 'button'));

registerHelper(
  'CG_button-modifiers',
  (params: { hash: Pick<TButtonTmpProps, 'variant' | 'fullWidth' | 'withIcon'> }) => {
    const { variant, fullWidth, withIcon } = params.hash;
    return `${variant || 'primary'} ${fullWidth ? 'full-width' : ''} ${withIcon ? 'icon icon-' + withIcon : ''}`;
  }
);

export const ButtonTpl = template;
