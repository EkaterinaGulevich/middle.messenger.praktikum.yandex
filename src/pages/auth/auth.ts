import {registerHelper} from 'handlebars'

import {TCG} from 'src/utils/CG'
import {getFormData} from "src/utils/getFormData";

import template from './auth.hbs'
import {AuthFormData} from "./auth.types";
import './auth.scss'

registerHelper('CG_auth', options => TCG(options, 'auth'))

export function runAuthPage() {
    const btnAuth = document.getElementById('btn-auth')
    if (!btnAuth) {
        throw Error('Not found HTMLElement with id="btn-auth" in DOM')
    }
    btnAuth.onclick = function () {
        const formData: AuthFormData = {
            login: '',
            password: '',
            ...getFormData('auth')
        }
        console.log(formData)
        window.location.pathname = '/chats'
    }
}

export const AuthTpl = template
