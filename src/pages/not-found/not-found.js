import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import tpl from './not-found.hbs'
import './not-found.scss'

Handlebars.registerHelper('CG_not_found_page', options => TCG(options, 'not_found_page'))

export default function () {
    document.getElementById('root').innerHTML = tpl()
    document.getElementById('not-found-back_btn').onclick = function () {
        window.location.pathname = '/'
    }
}
