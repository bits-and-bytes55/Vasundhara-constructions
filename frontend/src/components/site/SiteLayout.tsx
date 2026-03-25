import { Outlet } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteNavbar from './SiteNavbar'
import './site-shell.css'

function SiteLayout() {
  return (
    <div className="site-shell">
      <SiteNavbar />
      <main className="site-shell__main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default SiteLayout
