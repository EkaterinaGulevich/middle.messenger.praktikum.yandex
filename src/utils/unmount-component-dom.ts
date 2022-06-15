import { Component } from 'src/modules';
import { TJsonObject } from '../common-types';

/** Используется для удаления из DOM компонента, наследуемого от {@link Component} */
export function unmountComponentDOM(component: Component<TJsonObject>) {
  component.eventBus.emit(Component.EVENTS.FLOW_CU);
}
