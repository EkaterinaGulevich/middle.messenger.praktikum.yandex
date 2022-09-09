import Handlebars from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './textarea.hbs';
import './textarea.scss';
import { Component } from 'src/core';
import { TTextareaComponentCallbacks, TTextareaComponentState } from 'src/components/textarea/textarea.types';
import { TInputEvents } from 'src/components/input/input.types';

Handlebars.registerHelper('CG_textarea', (options) => createTmpClassName(options, 'textarea'));

export class TextareaComponent extends Component<TTextareaComponentState> {
  callbacks: TTextareaComponentCallbacks;
  readonly _meta: {
    value: string;
  };

  constructor(initialState: TTextareaComponentState, callbacks?: TTextareaComponentCallbacks) {
    super(initialState);

    this.callbacks = callbacks || {};
    this._meta = {
      value: '',
    };
  }

  clearValue() {
    this._meta.value = '';
  }

  componentDidUpdate() {
    const textareaElem = this.elementInDOM as HTMLTextAreaElement;
    textareaElem.value = this._meta.value;

    textareaElem.focus();
  }

  registerEvents() {
    const textareaElem = this.elementInDOM as HTMLTextAreaElement;

    textareaElem.addEventListener('change', (event) => {
      const target = event.target as HTMLTextAreaElement;
      this._meta.value = target.value;
    });

    (
      Object.entries(this.callbacks) as [TInputEvents, (_event: Event, _component: TextareaComponent) => void][]
    ).forEach(([event, cb]) => {
      textareaElem[event] = (e: Event) => {
        cb(e, this);
      };
    });
  }

  render(): string {
    return template(this.state);
  }
}
