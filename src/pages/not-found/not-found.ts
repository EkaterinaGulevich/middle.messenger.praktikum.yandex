import Handlebars from 'handlebars';
import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';
import { TJsonObject } from 'src/types';

import template from './not-found.hbs';
import './not-found.scss';

Handlebars.registerHelper('CG_not_found_page', (options) => createTmpClassName(options, 'not_found_page'));

export class NotFoundPageComponent extends Component<TJsonObject> {
  constructor() {
    super({});
  }

  render() {
    return template({
      backPathname: '/chats',
    });
  }
}
