import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import './auth.scss'

Handlebars.registerHelper('CG_auth', options => TCG(options, 'auth'))

export default function () {
    const state = {
        login: null,
        password: null
    }

    document.getElementById('input-login').onchange = function (e) {
        state.login = e.target.value
    }

    document.getElementById('input-password').onchange = function (e) {
        state.password = e.target.value
    }

    document.getElementById('btn-auth').onclick = function () {
        window.location.pathname = '/chats'
    }
}

export tpl from './auth.hbs'