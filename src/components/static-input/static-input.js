import Handlebars from 'handlebars'
import tpl from '../../components/static-input/static-input.hbs'
import {TCG} from '../../utils/CG';
import './static-input.scss'

Handlebars.registerPartial('static-input', tpl)

Handlebars.registerHelper('CG_static-input', options => TCG(options, 'static-input'))

export default ({ label, value }) => {
  return tpl({ label, value })
}
