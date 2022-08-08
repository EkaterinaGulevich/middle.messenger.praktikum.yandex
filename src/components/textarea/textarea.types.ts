import { TextareaComponent } from './textarea';

export type TTextareaTmpProps = {
  className?: string;
  placeholder?: string;
  id?: string;
  name?: string;
};

export type TTextareaComponentState = TTextareaTmpProps;

export type TTextareaEvents = 'onblur';

export type TTextareaComponentCallbacks = Partial<
  Record<TTextareaEvents, (_event: Event, _component: TextareaComponent) => void>
>;
