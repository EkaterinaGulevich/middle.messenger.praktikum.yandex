import { Component } from '../modules/component';
import { TJsonObject } from '../common-types';

/** Используется для рендера массива компонентов, наследуемых от {@link Component} */
export function renderArrayOfComponentsDOM(components: Component<TJsonObject>[], parentElemSelector: string) {
  if (!components.length) {
    return;
  }

  const root = document.querySelector(parentElemSelector);
  if (!root) {
    throw new Error(`renderArrayOfComponentsDOM: Not found ${parentElemSelector} in DOM`);
  }

  const fragment = document.createDocumentFragment();
  const nodes: (ChildNode | null)[] = [];

  components.forEach((component) => {
    component.createElement();
    nodes.push(component.element);
  });

  nodes.forEach((node) => {
    if (node) {
      fragment.appendChild(node);
    }
  });

  root.appendChild(fragment);

  components.forEach((component) => {
    component.dispatchComponentDidMount();
  });
}
