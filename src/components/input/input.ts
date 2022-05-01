import {registerPartial, registerHelper} from 'handlebars'

import {TCG} from 'src/utils/CG';

import template from './input.hbs'
import {InputProps} from "./input.types";
import './input.scss'

registerPartial('input', template)

registerHelper('CG_input', options => TCG(options, 'input'))

registerHelper('CG_input-modifiers', (params: { hash: Pick<InputProps, "fullWidth"> }) => {
    const {fullWidth} = params.hash
    return `${fullWidth ? ' full-width' : ''}`
})

export const InputTpl = template

