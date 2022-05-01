import {registerPartial, registerHelper} from 'handlebars'

import {TCG} from 'src/utils/CG';

import template from './link.hbs'
import './link.scss'

registerPartial('link', template)

registerHelper('CG_link', options => TCG(options, 'link'))

export const LinkTpl = template

