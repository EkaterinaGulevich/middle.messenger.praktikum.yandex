import { registerHelper } from 'handlebars';
import { createTmpClassName } from 'src/utils';
import { Component, browserRouter } from 'src/modules';
import { TJsonObject } from 'src/common-types';

import { getBackMessage } from './helpers/getBackMessage';
import template from './not-found.hbs';
import './not-found.scss';

registerHelper('CG_not_found_page', (options) => createTmpClassName(options, 'not_found_page'));

export class NotFoundPageComponent extends Component<TJsonObject> {
  constructor(parentElemSelector: string) {
    super({}, parentElemSelector);
  }

  render() {
    const prevRoute = browserRouter.getPrevRoute();
    const backPathname = prevRoute.pathname || '/';
    const backMessage = getBackMessage(backPathname);
    return template({
      backPathname,
      backMessage,
    });
  }
}
