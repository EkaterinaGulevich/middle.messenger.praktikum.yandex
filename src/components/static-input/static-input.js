import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG';

import tpl from './static-input.hbs'
import './static-input.scss'

Handlebars.registerPartial('static-input', tpl)

Handlebars.registerHelper('CG_static-input', options => TCG(options, 'static-input'))

export default ({label, value}) => {
    return tpl({label, value})
}
