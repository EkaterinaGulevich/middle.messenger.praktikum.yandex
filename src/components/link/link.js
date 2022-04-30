import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG';

import tpl from './link.hbs'
import './link.scss'

Handlebars.registerPartial('link', tpl)

Handlebars.registerHelper('CG_link', options => TCG(options, 'link'))

export default ({href, value, className}) => {
    return tpl({href, value, className})
}
