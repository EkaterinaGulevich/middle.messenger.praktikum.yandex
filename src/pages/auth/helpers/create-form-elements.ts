import { AuthComponent } from '../auth';
import { InputComponent } from 'src/components/input/input';
import { TInputComponentCallbacks, TInputTmpProps } from 'src/components/input/input.types';

export function createFormElements(ctx: AuthComponent): { loginInput: InputComponent; passwordInput: InputComponent } {
  const commonInputProps: Partial<TInputTmpProps> = {
    fullWidth: true,
    className: 'auth-input',
  };

  const callbacks: TInputComponentCallbacks = {
    onblur: ctx.onBlur,
  };

  const loginInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
    },
    callbacks
  );

  const passwordInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
    },
    callbacks
  );

  return { loginInput, passwordInput };
}
