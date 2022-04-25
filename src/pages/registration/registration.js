import Handlebars from 'handlebars'

import tpl from './registration.hbs'
import './registration.scss'

import { TCG } from '../../utils/CG.js'

Handlebars.registerHelper('CG_registration', options =>
  TCG(options, 'registration')
)

export default function () {
  document.getElementById('root').innerHTML = tpl()

  const state = {
    mail: '',
    login: '',
    name: '',
    family: '',
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

  document.getElementById('input-name').onchange = function (e) {
    state.name = e.target.value
  }

  document.getElementById('input-family').onchange = function (e) {
    state.family = e.target.value
  }

  document.getElementById('input-phone').onchange = function (e) {
    state.phone = e.target.value
  }

  document.getElementById('input-password').onchange = function (e) {
    state.password = e.target.value
  }

  document.getElementById('input-repeat-password').onchange = function (e) {
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
