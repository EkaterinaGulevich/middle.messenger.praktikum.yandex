import { Component } from 'src/modules';
import { TJsonObject } from 'src/common-types';
import { renderComponentDOM, unmountComponentDOM } from 'src/utils';
import { TRoutPathname } from 'src/consts/routes';

type TRoute = {
  pathname: TRoutPathname | null;
  component: Component<TJsonObject>;
};

class Router {
  private history: History = window.history;
  private routes: TRoute[] = [];
  private defaultComponent: Component<TJsonObject> | null = null;
  private currentRoute: TRoute | null = null;

  use(pathname: TRoutPathname, component: Component<TJsonObject>) {
    const route: TRoute = { pathname, component: component };
    this.routes.push(route);
    return this;
  }

  useDefault(component: Component<TJsonObject>) {
    this.defaultComponent = component;
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    if (this.currentRoute) {
      unmountComponentDOM(this.currentRoute.component);
    }

    const route = this.getRoute(pathname);
    if (!route) {
      if (this.defaultComponent) {
        this.currentRoute = { pathname: null, component: this.defaultComponent };
        renderComponentDOM(this.defaultComponent);
      } else {
        this.currentRoute = null;
      }
      return;
    }
    this.currentRoute = route;
    renderComponentDOM(route.component);
  }

  go(pathname: TRoutPathname) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.pathname === pathname);
  }

  getPrevRoute() {
    return this.routes[this.routes.length - 2];
  }
}

export const browserRouter = new Router();
