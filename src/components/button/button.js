import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG';

import tpl from './button.hbs'
import './button.scss'

Handlebars.registerPartial('button', tpl)

Handlebars.registerHelper('CG_button', options => TCG(options, 'button'))

Handlebars.registerHelper('CG_button-modifiers', (params) => {
    const {variant, fullWidth} = params.hash
    return `${variant ? variant : 'primary'}${fullWidth ? ' full-width' : ''}`
})

export default ({id, value, variant = 'primary', fullWidth = false, disabled, className}) => {
    return tpl({id, value, variant, fullWidth, disabled, className})
}
