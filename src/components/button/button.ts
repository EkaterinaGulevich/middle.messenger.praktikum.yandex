import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './button.hbs';
import { TButtonComponentCallbacks, TButtonComponentState, TButtonEvents, TButtonTmpProps } from './button.types';
import './button.scss';

registerHelper('CG_button', (options) => createTmpClassName(options, 'button'));
registerHelper(
  'CG_button-modifiers',
  (params: { hash: Pick<TButtonTmpProps, 'variant' | 'fullWidth' | 'withIcon'> }) => {
    const { variant, fullWidth, withIcon } = params.hash;
    return `${variant || 'primary'} ${fullWidth ? 'full-width' : ''} ${withIcon ? 'icon icon-' + withIcon : ''}`;
  }
);

export class ButtonComponent extends Component<TButtonComponentState> {
  callbacks: TButtonComponentCallbacks;

  constructor(initialState: TButtonComponentState, callbacks?: TButtonComponentCallbacks) {
    super(initialState);

    this.callbacks = callbacks || {};
  }

  registerEvents() {
    const btn = this.elementInDOM as HTMLButtonElement;

    (Object.entries(this.callbacks) as [TButtonEvents, (_event: Event, _component: ButtonComponent) => void][]).forEach(
      ([event, cb]) => {
        btn[event] = (e: Event) => {
          cb(e, this);
        };
      }
    );
  }

  render() {
    return template({
      ...this.state,
    });
  }
}
