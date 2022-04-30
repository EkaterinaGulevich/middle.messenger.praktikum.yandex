import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG';

import tpl from './input.hbs'
import './input.scss'

Handlebars.registerPartial('input', tpl)

Handlebars.registerHelper('CG_input', options => TCG(options, 'input'))

Handlebars.registerHelper('CG_input-modifiers', (params) => {
    const {fullWidth} = params.hash
    return `${fullWidth ? ' full-width' : ''}`
})

export default ({id, placeholder, type = 'text', className, fullWidth}) => {
    return tpl({id, placeholder, type, className, fullWidth})
}
