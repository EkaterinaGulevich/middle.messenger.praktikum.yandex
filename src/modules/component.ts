import { EventBus } from './event-bus';
import { makePropsProxy } from './make-props-proxy';
import { debounce } from '../utils/debounce';
import { TJsonObject } from '../common-types';
import { cloneDeepJsonObject } from '../utils/clone-deep-json-object';
import { createId } from '../utils/create-id';
import { parseTmp } from '../utils/parse-tmp';

export abstract class Component<T extends TJsonObject> {
  props: T;
  lastProps: T;
  parentElemSelector: string;
  eventBus: EventBus;

  private _element: ChildNode | null = null;
  private mounted = false;
  readonly id: string;

  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CWU: 'flow:component-will-update',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  /**
   * @constructor
   * @param {TJsonObject} props - Свойста компонента, при изменении которых компонент будет обновляться.
   * @param {string} parentElemSelector - Селектор родительского элемента, куда будет рендерится компонент.
   */
  protected constructor(props: T, parentElemSelector: string) {
    const eventBus = new EventBus();
    this.parentElemSelector = parentElemSelector;
    this.eventBus = eventBus;
    this.lastProps = cloneDeepJsonObject(props);

    this.id = createId();

    const callbackOnSet = (_prevProps: T, nextProps: T) => {
      this.eventBus.emit(Component.EVENTS.FLOW_CWU, this.lastProps, nextProps);
      this.lastProps = cloneDeepJsonObject(nextProps);
    };

    this.props = makePropsProxy<T>({
      props,
      canDeleteProperty: false,
      callbackOnSet: debounce(callbackOnSet, 100),
    });

    this._componentDidMount = this._componentDidMount.bind(this);
    this._componentDidUpdate = this._componentDidUpdate.bind(this);
    this._componentWillUpdate = this._componentWillUpdate.bind(this);
    this._render = this._render.bind(this);

    this._registerEvents(eventBus);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount);
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate);
    eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUpdate);
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render);
  }

  private _dispatchComponentDidMount() {
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

  private _dispatchComponentDidUpdate() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDU);
  }

  private _componentDidUpdate() {
    this.componentDidUpdate();
  }

  /**
   * Вызывается после обновления компонента в DOM-е
   * (но не при первоначальном монтировании) */
  componentDidUpdate(): void {
    // Переопределяется наследником класса
  }

  private _componentWillUpdate(prevProps: T, nextProps: T) {
    const needUpdate = this.shouldComponentUpdate(prevProps, nextProps);

    if (needUpdate) {
      this._render();
    }
  }

  /**
   * Определяет, должен ли компонент перерендериться после обновления props.
   * По умолчанию: true
   * */
  shouldComponentUpdate(_prevProps: T, _nextProps: T): boolean {
    // Переопределяется наследником класса

    return true;
  }

  setProps(nextProps: T) {
    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  get selector() {
    return `[component_id=${this.id}]`;
  }

  private _render() {
    const template = this.render();
    this._element = parseTmp(template, this.id);

    const root = document.querySelector(this.parentElemSelector);

    if (!root) {
      throw new Error(`Component: Not found ${this.parentElemSelector} in DOM`);
    }

    if (!this.mounted) {
      if (this._element) {
        root.appendChild(this._element);
        this._dispatchComponentDidMount();
      }
    } else {
      root.querySelector(this.selector)?.replaceWith(this._element || '');
      this._dispatchComponentDidUpdate();
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
