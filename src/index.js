import {sayHello} from './modules/sayHello';

const root = document.querySelector('#root');
root.textContent = sayHello('World');