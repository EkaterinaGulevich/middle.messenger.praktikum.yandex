# Мессенджер

[![Netlify Status](https://api.netlify.com/api/v1/badges/f66e8e9c-f9e9-4cd9-8fac-a51e366bbab8/deploy-status?branch=deploy)](https://messenger-gulevich.netlify.app)
[![Heroku](https://pyheroku-badge.herokuapp.com/?app=messenger-gulevich)](https://messenger-gulevich.herokuapp.com)
![Known Vulnerabilities](https://snyk.io/test/github/EkaterinaGulevich/middle.messenger.praktikum.yandex/badge.svg)

Веб-приложение для обмена мгновенными сообщениями.


> Данный проект разрабатывается в учебных целях.

> Пока не адаптировано под мобильную версию.


![Preview](/static/for-readme.JPG)


## Демо
Приложение развернуто на [Heroku](https://messenger-gulevich.herokuapp.com) и [Netlify](https://messenger-gulevich.netlify.app).

## Локальный запуск

### Запуск проекта

1. Выполнить команды:

   - Для сборки с помощью Parcel

    ```shell
    npm install && npm run start:parcel
    ```

   - Либо для сборки с помощью Webpack
    ```shell
    npm install && npm run start:webpack
    ```
2. Открыть страницу в бразузере http://localhost:3000/


### Запуск проекта для разработки

1. Выполнить команды:
   - Для сборки с помощью Parcel

   ```shell
   npm install && npm run dev:parcel
   ```
   - Либо для сборки с помощью Webpack
   ```shell
   npm install && npm run dev:webpack
   ```

2. Затем открыть страницу в бразузере http://localhost:1234/

### Запуск проекта через Docker

1. Выполнить команды
   ```shell
   docker build . -t <your_name>
   ```
      ```shell
   docker run -p 3001:3000 -d <your_name>
   ```
2. Затем открыть страницу в бразузере http://localhost:3001/

## Роутинг проекта

| Путь            | Описание               |
|-----------------|:-----------------------|
| `/auth`         | авторизация            |
| `/registration` | регистрация            |
| `/profile`      | просмотр профиля       |
| `/edit-profile` | редактирование профиля |
| `/` и `/chats`  | чаты                   |
| other           | страница 404           |



## Полезные ссылки

- [Прототип в Figma](https://www.figma.com/file/JbTi3UC2k7B7QVvXOsYiwI/%D0%9C%D0%B5%D1%81%D1%81%D0%B5%D0%BD%D0%B4%D0%B6%D0%B5%D1%80?node-id=0%3A1)


## Обратная связь

Вы обнаружили баг или у вас есть идеи для новых фич? Я буду благодарна оставленному [Issue](https://github.com/EkaterinaGulevich/middle.messenger.praktikum.yandex/issues).
