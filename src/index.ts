import { router } from 'src/modules';
import { NotFoundPageComponent } from 'src/pages/not-found/not-found';
import { routes } from 'src/consts/routes';

import 'src/partials';

import './style.scss';
import { MODAL_SELECTOR, ROOT_SELECTOR } from 'src/consts/common';

const root = document.createElement('div');
root.id = ROOT_SELECTOR.replace('#', '');

const modal = document.createElement('div');
modal.id = MODAL_SELECTOR.replace('#', '');

// TODO для всех querySelector записывать тип через generic и проверять на null (проверить во всем проекте)
// document.querySelector('body') as HTMLBodyElement -> document.querySelector<HTMLBodyElement>('body');
const body = document.querySelector('body') as HTMLBodyElement;
body.appendChild(root);
body.appendChild(modal);

routes.forEach(({ pathname, component }) => {
  router.use(pathname, component);
});

router.useDefault(new NotFoundPageComponent()).start();
