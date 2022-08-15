import { ProfileEditComponent } from '../profile-edit';
import { TFormInputComponents } from 'src/pages/profile-edit/profile-edit.types';
import { TInputComponentCallbacks, TInputTmpProps } from 'src/components/input/input.types';
import { InputComponent } from 'src/components/input/input';

export function createFormElements(ctx: ProfileEditComponent): TFormInputComponents {
  const commonInputProps: Partial<TInputTmpProps> = {
    fullWidth: true,
    className: 'profile-edit-input',
    type: 'text',
  };
  const callbacks: TInputComponentCallbacks = {
    onblur: ctx.onBlur,
  };

  const emailInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'email',
      placeholder: 'Почта',
      value: ctx.state.email,
    },
    callbacks
  );

  const loginInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'login',
      placeholder: 'Логин',
      value: ctx.state.login,
    },
    callbacks
  );

  const firstNameInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'firstName',
      placeholder: 'Имя',
      value: ctx.state.firstName,
    },
    callbacks
  );

  const secondNameInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'secondName',
      placeholder: 'Фамилия',
      value: ctx.state.secondName,
    },
    callbacks
  );

  const phoneNameInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'phone',
      placeholder: 'Телефон',
      value: ctx.state.phone,
    },
    callbacks
  );

  return { emailInput, loginInput, firstNameInput, secondNameInput, phoneNameInput };
}
