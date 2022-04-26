import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import tpl from './profile-edit.hbs'
import './profile-edit.scss'

Handlebars.registerHelper('CG_profile-edit', options => TCG(options, 'profile-edit'))

export default function () {
    document.getElementById('root').innerHTML = tpl()

}
