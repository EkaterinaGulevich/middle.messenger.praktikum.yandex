import { browserRouter } from 'src/modules';
import { NotFoundPageComponent } from 'src/pages/not-found/not-found';
import { routes } from 'src/consts/routes';
import { ROOT_SELECTOR } from 'src/consts/common';

import 'src/components';

import './style.scss';

const root = document.querySelector(ROOT_SELECTOR);

if (!root) {
  throw Error(`Not found HTMLElement with id=${ROOT_SELECTOR} in DOM`);
}

routes.forEach(({ pathname, component }) => {
  browserRouter.use(pathname, component);
});

browserRouter.useDefault(new NotFoundPageComponent(ROOT_SELECTOR)).start();
