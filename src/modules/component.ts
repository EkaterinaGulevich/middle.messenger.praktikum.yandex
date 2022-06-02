import { EventBus } from './event-bus';
import { makePropsProxy } from './make-props-proxy';
import { TJsonObject } from 'src/common-types';
import { debounce, cloneDeepJsonObject, createId, parseTmp } from 'src/utils';

export abstract class Component<T extends TJsonObject> {
  state: T;
  parentElemSelector: string;
  eventBus: EventBus;

  private _element: ChildNode | null = null;
  private mounted = false;
  readonly id: string;
  private lastState: T;

  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CWU: 'flow:component-will-update',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  /**
   * @constructor
   * @param {TJsonObject} initialState - Свойста компонента, при изменении которых компонент будет обновляться.
   * @param {string} parentElemSelector - Селектор родительского элемента, куда будет рендерится компонент.
   */
  protected constructor(initialState: T, parentElemSelector: string) {
    const eventBus = new EventBus();
    this.parentElemSelector = parentElemSelector;
    this.eventBus = eventBus;
    this.lastState = cloneDeepJsonObject(initialState);

    this.id = createId();

    const callbackOnSet = (_prev: T, nextState: T) => {
      this.eventBus.emit(Component.EVENTS.FLOW_CWU, this.lastState, nextState);
      this.lastState = cloneDeepJsonObject(nextState);
    };

    this.state = makePropsProxy<T>({
      props: initialState,
      canDeleteProperty: false,
      callbackOnSet: debounce(callbackOnSet, 100),
    });

    this._componentDidMount = this._componentDidMount.bind(this);
    this._componentDidUpdate = this._componentDidUpdate.bind(this);
    this._componentWillUpdate = this._componentWillUpdate.bind(this);
    this._render = this._render.bind(this);
    this.createElement = this.createElement.bind(this);

    this._registerEvents(eventBus);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount);
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate);
    eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUpdate);
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render);
  }

  dispatchComponentDidMount() {
    this.mounted = true;
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  /** Вызывается 1 раз после появления компонента в DOM-е */
  componentDidMount(): void {
    // Переопределяется наследником класса
  }

  dispatchComponentDidUpdate() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDU);
  }

  private _componentDidUpdate() {
    this.componentDidUpdate(this.lastState);
  }

  /**
   * Вызывается после обновления компонента в DOM-е
   * (но не при первоначальном монтировании) */
  componentDidUpdate(_prevState: T): void {
    // Переопределяется наследником класса
  }

  private _componentWillUpdate(prevState: T, nextState: T) {
    const needUpdate = this.shouldComponentUpdate(prevState, nextState);

    if (needUpdate) {
      this._render();
    }
  }

  /**
   * Определяет, должен ли компонент перерендериться после обновления state.
   * По умолчанию: true
   * */
  shouldComponentUpdate(_prevState: T, _nextState: T): boolean {
    // Переопределяется наследником класса

    return true;
  }

  setState(newState: Partial<T>) {
    Object.assign(this.state, newState);
  }

  get element() {
    return this._element;
  }

  get selector() {
    return `[component_id=${this.id}]`;
  }

  createElement() {
    const template = this.render();
    this._element = parseTmp(template, this.id);
  }

  private _render() {
    this.createElement();

    const root = document.querySelector(this.parentElemSelector);

    if (!root) {
      throw new Error(`Component: Not found ${this.parentElemSelector} in DOM`);
    }

    if (!this.mounted) {
      if (this._element) {
        root.appendChild(this._element);
        this.dispatchComponentDidMount();
      }
    } else {
      const existingComponent = root.querySelector(this.selector);
      if (!existingComponent) {
        throw new Error(`Component rerendering: Not found mounted component in DOM in ${this.parentElemSelector}`);
      }
      existingComponent.replaceWith(this._element || '');
      this.dispatchComponentDidUpdate();
    }
  }

  /**
   * Должен возвращать шаблон hbs
   * */
  render(): string {
    // Переопределяется наследником класса

    return '';
  }
}
