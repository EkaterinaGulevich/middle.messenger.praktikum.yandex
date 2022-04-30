import {tpl as NotFoundPageTpl} from './pages/not-found/not-found.js'
import {tpl as ChatsTpl} from './pages/chats/chats.js'
import Auth, {tpl as AuthTpl} from './pages/auth/auth.js'
import Registration, {tpl as RegistrationTpl} from './pages/registration/registration.js'
import {tpl as ProfileViewTpl} from './pages/profile-view/profile-view.js'
import {tpl as ProfileEditTpl} from './pages/profile-edit/profile-edit.js'
import './components/index.js'
import './style.scss'

const currentPathname = window.location.pathname
const root = document.getElementById('root');

switch (currentPathname) {
    case '/':
    case '/chats':
        root.innerHTML = ChatsTpl()
        break
    case '/auth':
        root.innerHTML = AuthTpl()
        Auth()
        break
    case '/registration':
        root.innerHTML = RegistrationTpl()
        Registration()
        break
    case '/profile':
        root.innerHTML = ProfileViewTpl()
        break
    case '/edit-profile':
        root.innerHTML = ProfileEditTpl()
        break
    default:
        root.innerHTML = NotFoundPageTpl()
        break
}
