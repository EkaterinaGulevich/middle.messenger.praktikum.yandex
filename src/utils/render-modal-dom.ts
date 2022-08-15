import { Component } from 'src/modules/component';
import { MODAL_SELECTOR } from 'src/consts/common';
import { TJsonObject } from 'src/types';

/** Используется для рендера модальных окон, наследуемых от {@link Component} */
export function renderModalDOM(component: Component<TJsonObject>) {
  component.createElement();

  if (component.element) {
    document.querySelector(MODAL_SELECTOR)?.replaceChildren(component.element);
    component.dispatchComponentDidMount();
  }
}
