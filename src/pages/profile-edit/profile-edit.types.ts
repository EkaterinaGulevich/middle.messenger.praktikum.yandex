import { InputComponent } from 'src/components/input/input';

export type TProfileEditTmpProps = {
  avatarId: string;
  avatar: string;
  emailInput: string;
  loginInput: string;
  firstNameInput: string;
  secondNameInput: string;
  phoneNameInput: string;
  cancelButton: string;
  saveButton: string;
};

export type TProfileEditComponentState = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  avatar: string;
};

export type TFormInputComponents = {
  emailInput: InputComponent;
  loginInput: InputComponent;
  firstNameInput: InputComponent;
  secondNameInput: InputComponent;
  phoneNameInput: InputComponent;
};
