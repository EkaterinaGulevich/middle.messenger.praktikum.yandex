import Handlebars from 'handlebars'

import {TCG} from '../../utils/CG.js'

import tpl from './registration.hbs'
import './registration.scss'

Handlebars.registerHelper('CG_registration', options =>
    TCG(options, 'registration')
)

export default function () {
    document.getElementById('root').innerHTML = tpl()

    const state = {
        mail: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: '',
        repeatPassword: ''
    }

    document.getElementById('input-mail').onchange = function (e) {
        state.mail = e.target.value
    }

    document.getElementById('input-login').onchange = function (e) {
        state.login = e.target.value
    }

    document.getElementById('input-first_name').onchange = function (e) {
        state.firstName = e.target.value
    }

    document.getElementById('input-second_name').onchange = function (e) {
        state.secondName = e.target.value
    }

    document.getElementById('input-phone').onchange = function (e) {
        state.phone = e.target.value
    }

    document.getElementById('input-password').onchange = function (e) {
        state.password = e.target.value
    }

    document.getElementById('input-repeat_password').onchange = function (e) {
        state.repeatPassword = e.target.value
    }

    document.getElementById('btn-registration').onclick = function () {
        console.log(state)
        window.location.pathname = '/auth'
    }

    document.getElementById('link-to-auth').onclick = function () {
        window.location.pathname = '/auth'
    }
}
