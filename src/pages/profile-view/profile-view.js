import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import tpl from './profile-view.hbs'
import './profile-view.scss'

Handlebars.registerHelper('CG_profile-view', options => TCG(options, 'profile-view'))

export default function () {
    document.getElementById('root').innerHTML = tpl()

}
