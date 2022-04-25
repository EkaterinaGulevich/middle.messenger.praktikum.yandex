import Handlebars from 'handlebars'

import tpl from './chats.hbs'
import './chats.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG_chats', options => TCG(options, 'chats'))

export default function () {
  document.getElementById('root').innerHTML = tpl()

}
