import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { fetchAdminMe } from '../../api/auth'
import { clearAdminSession, getAdminToken, storeAdminSession } from '../../utils/adminAuthStorage'
import '../../admin-panel.css'

function ProtectedAdminRoute() {
  const location = useLocation()
  const [status, setStatus] = useState<'checking' | 'allowed' | 'denied'>('checking')

  useEffect(() => {
    const token = getAdminToken()

    if (!token) {
      setStatus('denied')
      return
    }

    fetchAdminMe(token)
      .then((user) => {
        storeAdminSession(token, user)
        setStatus('allowed')
      })
      .catch(() => {
        clearAdminSession()
        setStatus('denied')
      })
  }, [])

  if (status === 'checking') {
    return (
      <div className="admin-shell">
        <div className="admin-shell__inner">
          <div className="admin-auth-card admin-auth-card--compact">
            <p className="admin-kicker">Admin Access</p>
            <h1>Checking your session...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'denied') {
    return <Navigate replace state={{ from: location.pathname }} to="/admin/login" />
  }

  return <Outlet />
}

export default ProtectedAdminRoute
