import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import './chats.scss'

Handlebars.registerHelper('CG_chats', options => TCG(options, 'chats'))

export tpl from './chats.hbs'

