import { queryStringify } from 'src/utils';
import { TRequestOptions } from 'src/types';
import { router } from 'src/core/index';

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getFullUrl(path: string) {
    return this.baseUrl + path;
  }

  get = (url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(this.getFullUrl(url), { ...options, method: 'GET' });
  };

  post = (url: string, options: TRequestOptions = {}) => {
    return this.request(this.getFullUrl(url), { ...options, method: 'POST' });
  };

  put = (url: string, options: TRequestOptions = {}) => {
    return this.request(this.getFullUrl(url), { ...options, method: 'PUT' });
  };

  delete = (url: string, options: TRequestOptions = {}) => {
    return this.request(this.getFullUrl(url), { ...options, method: 'DELETE' });
  };

  request = (
    url: string,
    options: TRequestOptions & { method: 'GET' | 'POST' | 'PUT' | 'DELETE' }
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, timeout = 5000 } = options;
    const dataIsFile = data instanceof File;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const urlValue = method === 'GET' && !!data && !dataIsFile ? `${url}${queryStringify(data)}` : url;
      xhr.open(method, urlValue);

      if (!dataIsFile) {
        xhr.setRequestHeader('content-type', 'application/json');
      }
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = true;

      xhr.onload = () => {
        if (
          xhr.status === 401 &&
          window.location.pathname !== '/auth' &&
          window.location.pathname !== '/registration'
        ) {
          router.go('/auth');
        } else if (xhr.status >= 400) {
          try {
            reject(JSON.parse(xhr.response));
          } catch {
            reject(xhr.response);
          }
        }

        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.ontimeout = reject;
      xhr.onabort = reject;
      xhr.onerror = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (dataIsFile) {
        const form = new FormData();
        form.append('avatar', data);
        xhr.send(form);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
