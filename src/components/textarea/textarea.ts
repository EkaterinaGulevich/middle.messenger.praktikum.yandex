import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './textarea.hbs';
import './textarea.scss';
import { Component } from 'src/modules';
import { TTextareaComponentCallbacks, TTextareaComponentState } from 'src/components/textarea/textarea.types';
import { TInputEvents } from 'src/components/input/input.types';

registerHelper('CG_textarea', (options) => createTmpClassName(options, 'textarea'));

export class TextareaComponent extends Component<TTextareaComponentState> {
  callbacks: TTextareaComponentCallbacks;

  constructor(initialState: TTextareaComponentState, callbacks?: TTextareaComponentCallbacks) {
    super(initialState);

    this.callbacks = callbacks || {};
  }

  registerEvents() {
    const textareaElem = this.elementInDOM as HTMLTextAreaElement;

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
