import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';

import template from './header.hbs';
import { THeaderComponentState } from './header.types';
import './header.scss';

registerHelper('CG_header', (options) => createTmpClassName(options, 'header'));

const INITIAL_STATE: THeaderComponentState = {

};

export class HeaderComponent extends Component<THeaderComponentState> {


  constructor(parentElem: string) {
    super(INITIAL_STATE, parentElem);

  }

  componentDidUpdate() {

  }




  render() {
    return template({

    });
  }
}
