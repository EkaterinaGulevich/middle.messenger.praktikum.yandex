import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import './not-found.scss'

Handlebars.registerHelper('CG_not_found_page', options => TCG(options, 'not_found_page'))

export tpl from './not-found.hbs'
