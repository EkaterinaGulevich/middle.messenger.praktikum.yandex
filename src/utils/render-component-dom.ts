import { Component } from 'src/core';
import { TJsonObject } from 'src/types';
import { ROOT_SELECTOR } from 'src/consts/common';

/** Используется для рендера у компонентов, наследуемых от {@link Component} */
export function renderComponentDOM(component: Component<TJsonObject>) {
  component.createElement();

  if (component.element) {
    document.querySelector(ROOT_SELECTOR)?.replaceChildren(component.element);
    component.dispatchComponentDidMount();
  }
}
