import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'
import {getFormData} from "../../utils/getFormValues";

import './auth.scss'

Handlebars.registerHelper('CG_auth', options => TCG(options, 'auth'))

export default function () {
    document.getElementById('btn-auth').onclick = function () {
        const formData = getFormData(document.forms.auth)
        console.log(formData)
        window.location.pathname = '/chats'
    }
}

export tpl from './auth.hbs'
