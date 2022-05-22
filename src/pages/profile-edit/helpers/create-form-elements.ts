import { TInputComponentCallbacks, TInputTmpProps } from 'src/components/input/input.types';
import { InputComponent } from 'src/components/input/input';

import { ProfileEditComponent } from '../profile-edit';

export function createFormElements(ctx: ProfileEditComponent): InputComponent[] {
  const PARENT_SELECTOR = `#${ctx.formId}`;

  const commonInputProps: Partial<TInputTmpProps> = {
    fullWidth: true,
    className: 'profile-edit-input',
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
      value: ctx.state.email,
    },
    callbacks
  );

  const loginInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'login',
      placeholder: 'Логин',
      value: ctx.state.login,
    },
    callbacks
  );

  const firstNameInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'first_name',
      placeholder: 'Имя',
      value: ctx.state.first_name,
    },
    callbacks
  );

  const secondNameInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'second_name',
      placeholder: 'Фамилия',
      value: ctx.state.second_name,
    },
    callbacks
  );

  const phoneNameInput = new InputComponent(
    PARENT_SELECTOR,
    {
      ...commonInputProps,
      name: 'phone',
      placeholder: 'Телефон',
      value: ctx.state.phone,
    },
    callbacks
  );

  return [emailInput, loginInput, firstNameInput, secondNameInput, phoneNameInput];
}
