import { InputComponent } from 'src/components/input/input';

export type TRegistrationTmpProps = {
  emailInput: string;
  loginInput: string;
  firstNameInput: string;
  secondNameInput: string;
  phoneInput: string;
  passwordInput: string;
  repeatPasswordInput: string;
  signUpButton: string
};

export type TRegistrationComponentState = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
  repeatPassword: string;
};

export type TRegistrationFormInputs = {
  emailInput: InputComponent;
  loginInput: InputComponent;
  firstNameInput: InputComponent;
  secondNameInput: InputComponent;
  phoneInput: InputComponent;
  passwordInput: InputComponent;
  repeatPasswordInput: InputComponent;
};
