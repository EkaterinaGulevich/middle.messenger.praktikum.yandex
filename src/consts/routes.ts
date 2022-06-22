import { Component } from 'src/modules';
import { TJsonObject } from 'src/common-types';
import { ChatsComponent } from 'src/pages/chats/chats';
import { AuthComponent } from 'src/pages/auth/auth';
import { RegistrationComponent } from 'src/pages/registration/registration';
import { ProfileViewComponent } from 'src/pages/profile-view/profile-view';
import { DictionaryComponent } from 'src/pages/dictionary/dictionary';
import { ProfileEditComponent } from 'src/pages/profile-edit/profile-edit';

import { ROOT_SELECTOR } from './common';

const root = document.querySelector(ROOT_SELECTOR);

if (!root) {
  throw Error(`Not found HTMLElement with id=${ROOT_SELECTOR} in DOM`);
}

export type TRoutPathname = '/' | '/chats' | '/auth' | '/registration' | '/profile' | '/edit-profile' | '/dictionary';

type TRout = {
  pathname: TRoutPathname;
  component: Component<TJsonObject>;
};

const ChatsPage = new ChatsComponent(ROOT_SELECTOR);
const AuthPage = new AuthComponent(ROOT_SELECTOR);
const RegistrationPage = new RegistrationComponent(ROOT_SELECTOR);
const ProfilePage = new ProfileViewComponent(ROOT_SELECTOR);
const ProfileEditPage = new ProfileEditComponent(ROOT_SELECTOR);
const DictionaryPage = new DictionaryComponent(ROOT_SELECTOR);

export const routes: TRout[] = [
  { pathname: '/', component: ChatsPage },
  { pathname: '/chats', component: ChatsPage },
  { pathname: '/auth', component: AuthPage },
  { pathname: '/registration', component: RegistrationPage },
  { pathname: '/profile', component: ProfilePage },
  { pathname: '/edit-profile', component: ProfileEditPage },
  { pathname: '/dictionary', component: DictionaryPage },
];
