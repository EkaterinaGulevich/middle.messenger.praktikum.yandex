import { ButtonComponent } from 'src/components/button/button';

export type TButtonTmpProps = {
  id?: string;
  value: string;
  variant?: 'primary' | 'secondary' | 'pseudo';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  withIcon?: 'clip' | 'send' | 'menu';
};

export type TButtonComponentState = TButtonTmpProps;

export type TButtonEvents = 'onclick' | 'onfocus';

export type TButtonComponentCallbacks = Partial<
  Record<TButtonEvents, (_event: Event, _component: ButtonComponent) => void>
>;
