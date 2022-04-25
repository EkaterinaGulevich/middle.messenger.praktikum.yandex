import Handlebars from 'handlebars'

import tpl from './auth.hbs'
import './auth.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG_auth', options => TCG(options, 'auth'))

export default function () {
  document.getElementById('root').innerHTML = tpl()

}
