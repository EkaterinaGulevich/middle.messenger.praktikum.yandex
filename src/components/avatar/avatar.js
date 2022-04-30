import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG';

import tpl from './avatar.hbs'
import './avatar.scss'

Handlebars.registerPartial('avatar', tpl)

Handlebars.registerHelper('CG_avatar', options => TCG(options, 'avatar'))

export default ({label, value, className}) => {
    return tpl({label, value, className})
}
