import {registerHelper, registerPartial} from 'handlebars'

import {TCG} from 'src/utils/CG';

import template from './static-input.hbs'
import './static-input.scss'

registerPartial('static-input', template)

registerHelper('CG_static-input', options => TCG(options, 'static-input'))

export const StaticInputTpl = template

