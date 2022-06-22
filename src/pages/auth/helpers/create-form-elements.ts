import { TInputComponentCallbacks, TInputTmpProps } from 'src/components/input/input.types';
import { InputComponent } from 'src/components/input/input';

// @ts-ignore
import { AuthComponent } from '../auth';

// @ts-ignore
export function createFormElements(ctx: AuthComponent): InputComponent[] {
  const commonInputProps: Partial<TInputTmpProps> = {
    fullWidth: true,
    className: 'auth-input',
  };
  const callbacks: TInputComponentCallbacks = {
    blur: ctx.onBlur,
  };
  const loginInput = new InputComponent(
    `#${ctx.formId}`,
    {
      ...commonInputProps,
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
    },
    callbacks
  );
  const passwordInput = new InputComponent(
    `#${ctx.formId}`,
    {
      ...commonInputProps,
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
    },
    callbacks
  );

  return [loginInput, passwordInput];
}
