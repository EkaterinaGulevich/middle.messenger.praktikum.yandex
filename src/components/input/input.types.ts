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
};

export type TInputComponentState = TInputTmpProps;

export type TInputComponentCallbacks = {
  focus?: (_event: Event, _component: InputComponent) => void;
  blur?: (_event: Event, _component: InputComponent) => void;
  change?: (_event: Event, _component: InputComponent) => void;
};
