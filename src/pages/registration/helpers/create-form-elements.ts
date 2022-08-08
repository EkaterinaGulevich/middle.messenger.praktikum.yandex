import { RegistrationComponent } from '../registration';
import { TRegistrationFormInputs } from '../registration.types';
import { TInputComponentCallbacks, TInputTmpProps } from 'src/components/input/input.types';
import { InputComponent } from 'src/components/input/input';

export function createFormElements(ctx: RegistrationComponent): TRegistrationFormInputs {
  const commonInputProps: Partial<TInputTmpProps> = {
    fullWidth: true,
    className: 'registration-input',
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
    },
    callbacks
  );

  const loginInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'login',
      placeholder: 'Логин',
    },
    callbacks
  );

  const firstNameInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'firstName',
      placeholder: 'Имя',
    },
    callbacks
  );

  const secondNameInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'secondName',
      placeholder: 'Фамилия',
    },
    callbacks
  );

  const phoneInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'phone',
      placeholder: 'Телефон',
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

  const repeatPasswordInput = new InputComponent(
    {
      ...commonInputProps,
      name: 'repeatPassword',
      placeholder: 'Пароль (еще раз)',
      type: 'password',
    },
    callbacks
  );

  return { emailInput, loginInput, firstNameInput, secondNameInput, phoneInput, passwordInput, repeatPasswordInput };
}
