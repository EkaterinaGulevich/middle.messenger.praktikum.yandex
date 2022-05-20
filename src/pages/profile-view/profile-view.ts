import { registerHelper } from 'handlebars';

import { createTmpClassName } from 'src/utils';

import template from './profile-view.hbs';
import './profile-view.scss';

registerHelper('CG_profile-view', (options) => createTmpClassName(options, 'profile-view'));

export const ProfileViewTpl = template;
