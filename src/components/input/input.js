import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG';

import tpl from './input.hbs'
import './input.scss'

Handlebars.registerPartial('input', tpl)

Handlebars.registerHelper('CG_input', options => TCG(options, 'input'))

export default ({id, placeholder, modifiers, type = 'text'}) => {
    return tpl({id, placeholder, modifiers, type})
}
