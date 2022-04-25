import Handlebars from 'handlebars'

import tpl from './registration.hbs'
import './registration.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG_registration', options => TCG(options, 'registration'))

export default function () {
  document.getElementById('root').innerHTML = tpl()

}
