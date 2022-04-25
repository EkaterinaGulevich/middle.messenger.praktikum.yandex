import Handlebars from 'handlebars'

import tpl from './not-found.hbs'
import './not-found.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG_not_found_page', options => TCG(options, 'not_found_page'))

export default function () {
  document.getElementById('root').innerHTML = tpl()
  document.getElementById('not-found-back_btn').onclick = function () {
    window.location.pathname = '/'
  }
}
