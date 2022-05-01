import {registerHelper} from 'handlebars'

import {TCG} from 'src/utils/CG'

import template from './chats.hbs'
import './chats.scss'

registerHelper('CG_chats', options => TCG(options, 'chats'))

export const ChatsTpl = template

