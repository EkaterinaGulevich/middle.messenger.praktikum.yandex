import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'
import {getFormData} from "../../utils/getFormValues";

import './registration.scss'

Handlebars.registerHelper('CG_registration', options =>
    TCG(options, 'registration')
)

export default function () {
    document.getElementById('btn-registration').onclick = function () {
        const formData = getFormData(document.forms.registration)
        console.log(formData)
        window.location.pathname = '/chats'
    }
}

export tpl from './registration.hbs'
