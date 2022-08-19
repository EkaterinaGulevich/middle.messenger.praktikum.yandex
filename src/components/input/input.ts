import Handlebars from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './input.hbs';
import { TInputComponentCallbacks, TInputComponentState, TInputEvents, TInputTmpProps } from './input.types';
import './input.scss';

Handlebars.registerHelper('CG_input', (options) => createTmpClassName(options, 'input'));

Handlebars.registerHelper(
  'CG_input-modifiers',
  (params: { hash: Pick<TInputTmpProps, 'fullWidth' | 'withoutLabel'> }) => {
    const { fullWidth, withoutLabel } = params.hash;
    return `${fullWidth ? ' full-width' : ''} ${withoutLabel ? 'without-label' : ''}`;
  }
);

export class InputComponent extends Component<TInputComponentState> {
  callbacks: TInputComponentCallbacks;

  public value: string;

  constructor(initialState: TInputComponentState, callbacks?: TInputComponentCallbacks) {
    super(initialState);

    this.callbacks = callbacks || {};
    this.value = initialState.value || '';
  }

  shouldComponentUpdate(_prevState: TInputComponentState, nextState: TInputComponentState) {
    return this.value !== nextState.value;
  }

  registerEvents() {
    const input = this.elementInDOM?.querySelector('input');
    if (!input) {
      throw new Error('Input not exists  in DOM');
    }

    input.oninput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.value = target.value;
    };

    (Object.entries(this.callbacks) as [TInputEvents, (_event: Event, _component: InputComponent) => void][]).forEach(
      ([event, cb]) => {
        input[event] = (e: Event) => {
          cb(e, this);
        };
      }
    );
  }

  render() {
    return template({ id: this.id, ...this.state, value: this.value });
  }
}
