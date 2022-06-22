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
//
// // Кроме этого, в файле index.html больше ничего не нужно
//
// const host = 'https://ya-praktikum.tech';
//
// fetch(`${host}/api/v2/auth/signup`, {
//   method: 'POST',
//   credentials: 'include', // Нужно подставлять куки
//   mode: 'cors', // Работаем с CORS
//   headers: {
//     'content-type': 'application/json', // Данные отправляем в формате JSON
//   },
//   body: JSON.stringify({
//     first_name: "Артурт",
//     second_name: "Морган",
//     login: `a.morgan`,
//     email: `a.morgan@rdr2.com`,
//     phone: "+71234567890",
//     password: "p@ssw0rd", // Грустный и слабый пароль, можно вот так: oPKzos*1X$uKz$ta
//   }),
// })
//   .then(response => response.text()) // Можно вытащить через .json()
//   .then(data => {
//     console.log(data);
//     return data;
//   })
//   .then(_data => {
//     fetch(`${host}/api/v2/auth/user`, { // Получаем подробную информацию о пользователе и проверяем, что куки проставились
//       method: 'GET',
//       mode: 'cors',
//       credentials: 'include',
//     })
//       .then(r => r.json())
//       .then(data => {
//         console.log('user', data);
//       });
//   });
