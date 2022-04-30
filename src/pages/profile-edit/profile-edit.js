import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import './profile-edit.scss'

Handlebars.registerHelper('CG_profile-edit', options => TCG(options, 'profile-edit'))

export tpl from './profile-edit.hbs'
