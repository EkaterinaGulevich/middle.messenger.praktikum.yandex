import { registerHelper } from 'handlebars';

import { TCG } from 'src/utils/CG';

import template from './profile-edit.hbs';
import './profile-edit.scss';

registerHelper('CG_profile-edit', (options) => TCG(options, 'profile-edit'));

export const ProfileEditTpl = template;
