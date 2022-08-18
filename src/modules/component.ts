import { EventBus } from './event-bus';
import { makePropsProxy } from './make-props-proxy';
import { debounce, cloneDeepJsonObject, createId, parseTmp } from 'src/utils';
import { TJsonObject } from 'src/types';

export abstract class Component<T extends TJsonObject> {
  state: T;
  eventBus: EventBus;
  // eslint-disable-next-line no-use-before-define
  public childComponents: { [key: string]: Component<TJsonObject> | Component<TJsonObject>[] | null | undefined } = {};

  private _element: Element | null = null;
  private isMounted = false;
  readonly id: string;
  private lastState: T;

  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CWU: 'flow:component-will-update',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CU: 'flow:component-unmount',
    FLOW_RENDER: 'flow:render',
  };

  /**
   * @constructor
   * @param {TJsonObject} initialState - Свойста компонента, при изменении которых компонент будет обновляться.
   */
  protected constructor(initialState: T) {
    this.eventBus = new EventBus();
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
    this._componentUnmount = this._componentUnmount.bind(this);
    this._render = this._render.bind(this);
    this.createElement = this.createElement.bind(this);

    this._registerEvents();
  }

  private _registerEvents() {
    this.eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount);
    this.eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate);
    this.eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUpdate);
    this.eventBus.on(Component.EVENTS.FLOW_CU, this._componentUnmount);
    this.eventBus.on(Component.EVENTS.FLOW_RENDER, this._render);
  }

  /** Вызывается при DidMount и DidUpdate
   * Здесь необходимо навешивать события на элементы,
   * например, использовать addEventListener
   * */
  registerEvents() {
    // Переопределяется наследником класса
  }

  dispatchChildEvents(comp: Component<TJsonObject>) {
    if (comp?.elementInDOM) {
      if (comp.isMounted) {
        comp.dispatchComponentDidUpdate();
      } else {
        comp.dispatchComponentDidMount();
      }
    }
  }

  dispatchComponentDidMount() {
    this.isMounted = true;
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.registerEvents();
    this.componentDidMount();

    const childComponents = Object.values(this.childComponents);
    childComponents.forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((comp) => {
          this.dispatchChildEvents(comp);
        });
      } else if (child) {
        this.dispatchChildEvents(child);
      }
    });
  }

  /** Вызывается 1 раз после появления компонента в DOM-е */
  componentDidMount(): void {
    // Переопределяется наследником класса
  }

  dispatchComponentDidUpdate() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDU);
  }

  private _componentDidUpdate() {
    this.registerEvents();
    this.componentDidUpdate(this.lastState);

    const childComponents = Object.values(this.childComponents);
    childComponents.forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((comp) => {
          this.dispatchChildEvents(comp);
        });
      } else if (child) {
        this.dispatchChildEvents(child);
      }
    });
  }

  /**
   * Вызывается после обновления компонента в DOM-е
   * (но не при первоначальном монтировании) */
  componentDidUpdate(_prevState: T): void {
    // Переопределяется наследником класса
  }

  /**
   * Для удаления компонента из DOM */
  private _componentUnmount(): void {
    const childComponents = Object.values(this.childComponents);
    childComponents.forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((comp) => {
          if (comp.isMounted) {
            comp.eventBus.emit(Component.EVENTS.FLOW_CU);
          }
        });
      } else if (child?.isMounted) {
        child.eventBus.emit(Component.EVENTS.FLOW_CU);
      }
    });

    if (this.isMounted) {
      this.componentUnmount();
      this.elementInDOM?.replaceWith('');
      this.isMounted = false;
    }
  }

  /**
   * Вызывается при удалении компонента из DOM
   */
  componentUnmount(): void {
    // Переопределяется наследником класса
  }

  private _componentWillUpdate(prevState: T, nextState: T) {
    const needUpdate = this.shouldComponentUpdate(prevState, nextState);

    if (needUpdate) {
      this.componentWillUpdate(nextState);
      this._render();
    }
  }

  /**
   * Вызывается перед обновлением компонента
   * */
  componentWillUpdate(_nextState: T): void {
    // Переопределяется наследником класса
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

  get elementInDOM() {
    return document.querySelector(this.selector);
  }

  createElement() {
    const template = this.render();
    this._element = parseTmp(template, this.id);

    return this._element;
  }

  get elementHtml() {
    return this.createElement().outerHTML;
  }

  private _render() {
    if (this.isMounted) {
      this.createElement();

      if (!this.elementInDOM) {
        throw new Error(`Can not rerender component: Not found mounted component in DOM with ${this.selector}`);
      } else if (!this._element) {
        throw new Error(`Can not rerender component: Updated component is not a Node (${this.selector})`);
      } else {
        this.elementInDOM.replaceWith(this._element);
        this.dispatchComponentDidUpdate();
      }
    }

    return this;
  }

  /**
   * Должен возвращать шаблон hbs
   * */
  render(): string {
    // Переопределяется наследником класса

    return '';
  }
}
