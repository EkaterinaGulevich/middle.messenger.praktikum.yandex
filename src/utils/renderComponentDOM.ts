import { Component } from '../modules/component';
import { TJsonObject } from '../common-types'

/** Используется для вызова рендера у компонентов, наследуемых от {@link Component} */
export function RenderComponentDOM(block: Component<TJsonObject>) {
  block.eventBus.emit(Component.EVENTS.FLOW_RENDER);
}
