import Handlebars from 'handlebars'

import tpl from './profile-view.hbs'
import './profile-view.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG_profile-view', options => TCG(options, 'profile-view'))

export default function () {
  document.getElementById('root').innerHTML = tpl()

}
