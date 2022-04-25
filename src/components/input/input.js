import Handlebars from 'handlebars'
import tpl from './input.hbs'
import {TCG} from '../../utils/CG';
import './input.scss'

Handlebars.registerPartial('input', tpl)

Handlebars.registerHelper('CG_input', options => TCG(options, 'input'))

export default ({ id, placeholder, modifiers, type='text' }) => {
  return tpl({ id, placeholder, modifiers, type })
}
