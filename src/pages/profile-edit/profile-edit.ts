import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './profile-edit.hbs';
import './profile-edit.scss';

registerHelper('CG_profile-edit', (options) => createTmpClassName(options, 'profile-edit'));

export const ProfileEditTpl = template;
