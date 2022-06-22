// todo: Пока нигде не используется, покрою типами, когда начну пользоваться
// todo ^

import { browserRouter } from './router';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// todo вынести
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  private baseUrl = '';
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getFullUrl(path: string) {
    return this.baseUrl + path;
  }
  get = (url: string, options = {}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.request(this.getFullUrl(url), { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options = {}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.request(this.getFullUrl(url), { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options = {}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.request(this.getFullUrl(url), { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options = {}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.request(this.getFullUrl(url), { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options = {}, timeout = 5000) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      /// //
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.withCredentials = true;
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      /// //

      xhr.onload = function () {
        let reason = '';
        if (xhr.responseText ) {
          try {
            reason = JSON.parse(xhr.responseText)?.reason;

          } catch (e) {
           //
          }
        }

        if (reason === 'Login or password is incorrect') {
          alert('Неверный логин или пароль');
          throw xhr;
        } else if (reason === 'Login already exists') {
          alert('Пользователь с введенным логин уже существует. Пожалуйста, введите другой логин');
          throw xhr;
        } else if (xhr.status === 401 && window.location.pathname !== '/auth') {
          browserRouter.go('/auth');
          window.location.reload();
        }

        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        delete data.repeat_password;
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
