import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import './profile-view.scss'

Handlebars.registerHelper('CG_profile-view', options => TCG(options, 'profile-view'))

export tpl from './profile-view.hbs'
