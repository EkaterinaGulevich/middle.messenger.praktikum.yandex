import { registerPartial, registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './input.hbs';
import { TInputComponentCallbacks, TInputComponentState, TInputTmpProps } from './input.types';
import './input.scss';

registerPartial('input', template);

registerHelper('CG_input', (options) => createTmpClassName(options, 'input'));

registerHelper('CG_input-modifiers', (params: { hash: Pick<TInputTmpProps, 'fullWidth'> }) => {
  const { fullWidth } = params.hash;
  return `${fullWidth ? ' full-width' : ''}`;
});

export const InputTpl = template;

export class InputComponent extends Component<TInputComponentState> {
  callbacks: TInputComponentCallbacks;
  public value: string;

  constructor(parentElemSelector: string, initialState: TInputComponentState, callbacks?: TInputComponentCallbacks) {
    super(initialState, parentElemSelector);

    this.callbacks = callbacks || {};
    this.value = initialState.value || '';
  }

  shouldComponentUpdate(_prevState: TInputComponentState, nextState: TInputComponentState) {
    if (this.value === nextState.value) {
      return false;
    }
    return true;
  }

  addEvents() {
    const input = document.querySelector(this.selector)?.querySelector('input');

    if (!input) {
      throw new Error('Input not exists  in DOM');
    }

    input.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.value = target.value;
    });

    Object.entries(this.callbacks).forEach(([event, cb]) => {
      input.addEventListener(event, (e: Event) => {
        cb(e, this);
      });
    });
  }

  componentDidMount() {
    this.addEvents();
  }

  componentDidUpdate() {
    this.addEvents();
  }

  render() {
    return template({ id: this.id, ...this.state, value: this.value });
  }
}
