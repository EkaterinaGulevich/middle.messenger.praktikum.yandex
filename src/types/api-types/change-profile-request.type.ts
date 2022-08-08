export type TChangeProfileRequestBackend = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TChangeProfileRequest = {
  firstName: string;
  secondName: string;
  displayName?: string;
  login: string;
  email: string;
  phone: string;
};
