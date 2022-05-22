import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG';

import tpl from './button.hbs'
import './button.scss'

Handlebars.registerPartial('button', tpl)

Handlebars.registerHelper('CG_button', options => TCG(options, 'button'))

export default ({id, value, variant = 'primary', fullWidth = false, disabled}) => {
    const modifiers = `${variant}${fullWidth ? ' full-width' : ''}`
    return tpl({id, value, modifiers, disabled})
}
