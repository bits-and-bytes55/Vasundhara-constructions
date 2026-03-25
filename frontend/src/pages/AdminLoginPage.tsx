import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { fetchAdminMe, loginAdmin } from '../api/auth'
import '../admin-panel.css'
import { getAdminToken, storeAdminSession } from '../utils/adminAuthStorage'

function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || '/admin'
  const existingToken = getAdminToken()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (existingToken) {
    return <Navigate replace to="/admin" />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const session = await loginAdmin({ email, password })
      const verifiedUser = await fetchAdminMe(session.token)
      storeAdminSession(session.token, verifiedUser)
      navigate(from, { replace: true })
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-shell__inner">
        <div className="admin-auth-card">
          <p className="admin-kicker">Admin Login</p>
          <h1>Sign in to manage dynamic site content.</h1>
          <p className="admin-subtitle">
            Login ke baad aap homepage ke editable sections ko update kar sakte ho directly from the admin panel.
          </p>

          <form className="admin-auth-form" onSubmit={handleSubmit}>
            <label className="admin-field">
              <span>Email Address</span>
              <input className="admin-input" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
            </label>

            <label className="admin-field">
              <span>Password</span>
              <input className="admin-input" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
            </label>

            {error && <p className="admin-error">{error}</p>}

            <button className="admin-button" disabled={loading} type="submit">
              {loading ? 'Signing In...' : 'Login'}
            </button>
          </form>

          <p className="admin-auth-switch">
            New admin account? <Link to="/admin/register">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
