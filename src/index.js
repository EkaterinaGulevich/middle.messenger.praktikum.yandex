import NotFoundPage from './pages/not-found/not-found.js'
import './style.scss'

const currentPathname = window.location.pathname

switch (currentPathname) {
  case '/':
    break
  default:
    document.getElementById('root').innerHTML = NotFoundPage
    document.getElementById('not-found-back_btn').onclick = function () {
      window.location.pathname = '/'
    }
    break
}
