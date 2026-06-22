import { Outlet } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteNavbar from './SiteNavbar'
import './site-shell.css'
import RouteSEO from "../seo/RouteSEO"

function SiteLayout() {
  return (
    <div className="site-shel">
      <RouteSEO />
      <SiteNavbar />
      <main className="site-shell__main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default SiteLayout
