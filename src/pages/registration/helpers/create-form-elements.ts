import { TInputComponentCallbacks, TInputTmpProps } from 'src/components/input/input.types';
import { InputComponent } from 'src/components/input/input';

import { RegistrationComponent } from '../registration';

export function createFormElements(ctx: RegistrationComponent): InputComponent[] {
  const PARENT_SELECTOR = `#${ctx.formId}`;
  const commonInputProps: Partial<TInputTmpProps> = {
    fullWidth: true,
    className: 'registration-input',
    type: 'text',
  };
  const callbacks: TInputComponentCallbacks = {
    blur: ctx.onBlur,
  };

  const emailInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'email',
      placeholder: 'Почта',
    },
    callbacks
  );

  const loginInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'login',
      placeholder: 'Логин',
    },
    callbacks
  );

  const firstNameInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'first_name',
      placeholder: 'Имя',
    },
    callbacks
  );

  const secondNameInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'second_name',
      placeholder: 'Фамилия',
    },
    callbacks
  );

  const phoneNameInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'phone',
      placeholder: 'Телефон',
    },
    callbacks
  );

  const passwordInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
    },
    callbacks
  );

  const repeatPasswordInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'repeat_password',
      placeholder: 'Пароль (еще раз)',
      type: 'password',
    },
    callbacks
  );

  return [emailInput, loginInput, firstNameInput, secondNameInput, phoneNameInput, passwordInput, repeatPasswordInput];
}
