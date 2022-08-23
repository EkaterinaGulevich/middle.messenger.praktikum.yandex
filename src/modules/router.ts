import { renderComponentDOM } from 'src/utils';
import { TRoutePathname } from 'src/consts/routes';
import { Component } from 'src/modules';
import { TJsonObject } from 'src/types';

// TODO убрать дублирование типа в src/consts/routes.ts
type TRoute = {
  pathname: TRoutePathname | null;
  component: Component<TJsonObject>;
};

class Router {
  private history: History = window.history;
  private routes: TRoute[] = [];
  private defaultComponent: Component<TJsonObject> | null = null;
  private currentRoute: TRoute | null = null;

  use(pathname: TRoutePathname, component: Component<TJsonObject>) {
    const route: TRoute = { pathname, component: component };
    this.routes.push(route);
    return this;
  }

  useDefault(component: Component<TJsonObject>) {
    this.defaultComponent = component;
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      const { pathname } = target.location as Location;
      this._onRoute(pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    if (this.currentRoute) {
      this.currentRoute.component.eventBus.emit(Component.EVENTS.FLOW_CU);
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

  go(pathname: TRoutePathname) {
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
}

export const router = new Router();
