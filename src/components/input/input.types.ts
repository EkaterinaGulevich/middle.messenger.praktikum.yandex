import { InputComponent } from './input';

export type TInputTmpProps = {
  id?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  className?: string;
  fullWidth?: boolean;
  name: string;
  error?: string | null;
  value?: string;
  withoutLabel?: boolean;
};

export type TInputComponentState = TInputTmpProps;

export type TInputEvents = 'onfocus' | 'onblur' | 'onchange' | 'oninput';

export type TInputComponentCallbacks = Partial<
  Record<TInputEvents, (_event: Event, _component: InputComponent) => void>
>;
