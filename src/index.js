import NotFoundPage from './pages/not-found/not-found.js'
import Chats from './pages/chats/chats.js'
import Auth from './pages/auth/auth.js'
import Registration from './pages/registration/registration.js'
import ProfileView from './pages/profile-view/profile-view.js'
import ProfileEdit from './pages/profile-edit/profile-edit.js'
import './style.scss'

const currentPathname = window.location.pathname

switch (currentPathname) {
  case '/':
  case '/chats':
    Chats()
    break
  case '/auth':
    Auth()
    break
  case '/registration':
    Registration()
    break
  case '/profile':
    ProfileView()
    break
  case '/edit-profile':
    ProfileEdit()
    break
  default:
    NotFoundPage()
    break
}
