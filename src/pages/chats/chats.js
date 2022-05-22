import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import tpl from './chats.hbs'
import './chats.scss'

Handlebars.registerHelper('CG_chats', options => TCG(options, 'chats'))

export default function () {
    document.getElementById('root').innerHTML = tpl()

}
