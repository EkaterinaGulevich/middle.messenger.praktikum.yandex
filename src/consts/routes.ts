import { ChatsComponent } from 'src/pages/chats/chats';
import { AuthComponent } from 'src/pages/auth/auth';
import { RegistrationComponent } from 'src/pages/registration/registration';
import { ProfileViewComponent } from 'src/pages/profile-view/profile-view';
import { ProfileEditComponent } from 'src/pages/profile-edit/profile-edit';

import { Component } from 'src/modules/component';
import { TJsonObject } from 'src/types/';

export type TRoutePathname = '/' | '/chats' | '/auth' | '/registration' | '/profile' | '/edit-profile';

type TRout = {
  pathname: TRoutePathname;
  component: Component<TJsonObject>;
};

const ChatsPage = new ChatsComponent();
const AuthPage = new AuthComponent();
const RegistrationPage = new RegistrationComponent();
const ProfilePage = new ProfileViewComponent();
const ProfileEditPage = new ProfileEditComponent();

export const routes: TRout[] = [
  { pathname: '/', component: ChatsPage },
  { pathname: '/chats', component: ChatsPage },
  { pathname: '/auth', component: AuthPage },
  { pathname: '/registration', component: RegistrationPage },
  { pathname: '/profile', component: ProfilePage },
  { pathname: '/edit-profile', component: ProfileEditPage },
];
