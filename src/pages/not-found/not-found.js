import Handlebars from 'handlebars'

import tpl from './not-found.hbs'
import './not-found.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG', options => TCG(options, 'not_found_page'))

Handlebars.registerPartial('not-found', tpl)

const template = tpl()

export default template
