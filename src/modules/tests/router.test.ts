/* eslint-disable */
import { expect } from 'chai';
import { router } from '../router';

import { JSDOM } from 'jsdom';
import { Component } from 'src/modules';

const jsdom = new JSDOM(
  `<html>
     <body>
      <div id="root"></div>
     </body>
   </html>`,
  { url: 'https://localhost:3000/auth' }
);

global.window = jsdom.window as unknown as Window & typeof globalThis;
global.document = jsdom.window.document;

type ComponentState = { name: string; age: number };

const INITIAL_STATE: ComponentState = {
  age: 20,
  name: 'Vasya',
};

class FirstComponent extends Component<ComponentState> {
  constructor() {
    super(INITIAL_STATE);
  }

  render() {
    return '<div>first page</div>';
  }
}

class SecondComponent extends Component<ComponentState> {
  constructor() {
    super(INITIAL_STATE);
  }

  render() {
    return '<div>second page</div>';
  }
}

class NotFoundComponent extends Component<ComponentState> {
  constructor() {
    super(INITIAL_STATE);
  }

  render() {
    return '<div>Render NotFoundComponent</div>';
  }
}

describe('Test router', () => {
  const FirstPage = new FirstComponent();
  const SecondPage = new SecondComponent();
  const NotFoundPage = new NotFoundComponent();

  router.use('/auth', FirstPage);
  router.use('/registration', SecondPage);
  router.useDefault(NotFoundPage);

  it('getRoute for unknown path should return undefined', () => {
    router.start();
    expect(router.getRoute('/something')).to.equal(undefined);
  });

  it('getRoute for /auth should return FirstPage', () => {
    router.start();
    expect(router.getRoute('/auth')).to.eql({
      pathname: '/auth',
      component: FirstPage,
    });
  });

  it('should render FirstPage', () => {
    router.start();
    expect(document.querySelector('#root')?.textContent?.trim()).to.eq('first page');
  });

  it('should render SecondPage', () => {
    window.history.pushState({}, '', '/registration');
    router.start();
    expect(document.querySelector('#root')?.textContent?.trim()).to.eq('second page');
  });

  it('should render NotFoundPage', () => {
    window.history.pushState({}, '', '/something');
    router.start();
    expect(document.querySelector('#root')?.textContent?.trim()).to.eq('Render NotFoundComponent');
  });
});
