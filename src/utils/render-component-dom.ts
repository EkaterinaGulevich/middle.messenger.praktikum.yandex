import { Component } from 'src/modules';
import { TJsonObject } from '../common-types';

/** Используется для рендера у компонентов, наследуемых от {@link Component} */
export function renderComponentDOM(component: Component<TJsonObject>) {
  component.eventBus.emit(Component.EVENTS.FLOW_RENDER);
}
