import Handlebars from 'handlebars'
import tpl from './avatar.hbs'
import {TCG} from '../../utils/CG';
import './avatar.scss'

Handlebars.registerPartial('avatar', tpl)

Handlebars.registerHelper('CG_avatar', options => TCG(options, 'avatar'))

export default ({label, value}) => {
    return tpl({label, value})
}
