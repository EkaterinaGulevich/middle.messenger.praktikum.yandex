import Handlebars from 'handlebars'

import tpl from './auth.hbs'
import './auth.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG_auth', options => TCG(options, 'auth'))

export default function () {
  document.getElementById('root').innerHTML = tpl()

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
    console.log(state)
    window.location.pathname = '/chats'
  }

  document.getElementById('link-to-registration').onclick = function () {
    window.location.pathname = '/registration'
  }

}
