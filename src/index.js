import {sayHello} from './modules/sayHello';

import './style.scss';

const root = document.querySelector('#root');
root.textContent = sayHello('World');