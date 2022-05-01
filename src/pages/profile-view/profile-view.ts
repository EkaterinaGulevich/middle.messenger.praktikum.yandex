import {registerHelper} from 'handlebars';

import {TCG} from 'src/utils/CG'

import template from './profile-view.hbs'
import './profile-view.scss'

registerHelper('CG_profile-view', options => TCG(options, 'profile-view'))

export const ProfileViewTpl = template;
