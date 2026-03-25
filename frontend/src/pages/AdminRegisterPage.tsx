import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { fetchAdminMe, registerAdmin } from '../api/auth'
import '../admin-panel.css'
import { getAdminToken, storeAdminSession } from '../utils/adminAuthStorage'

function AdminRegisterPage() {
  const navigate = useNavigate()
  const existingToken = getAdminToken()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (existingToken) {
    return <Navigate replace to="/admin" />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const session = await registerAdmin({ name, email, password })
      const verifiedUser = await fetchAdminMe(session.token)
      storeAdminSession(session.token, verifiedUser)
      navigate('/admin', { replace: true })
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to register admin account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-shell__inner">
        <div className="admin-auth-card">
          <p className="admin-kicker">Admin Register</p>
          <h1>Create an admin account for the content panel.</h1>
          <p className="admin-subtitle">
            Register ke baad aapka account direct login ho jayega aur aap `/admin` se dynamic content edit kar paoge.
          </p>

          <form className="admin-auth-form" onSubmit={handleSubmit}>
            <label className="admin-field">
              <span>Full Name</span>
              <input className="admin-input" onChange={(event) => setName(event.target.value)} required type="text" value={name} />
            </label>

            <label className="admin-field">
              <span>Email Address</span>
              <input className="admin-input" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
            </label>

            <label className="admin-field">
              <span>Password</span>
              <input className="admin-input" minLength={6} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
            </label>

            <label className="admin-field">
              <span>Confirm Password</span>
              <input className="admin-input" minLength={6} onChange={(event) => setConfirmPassword(event.target.value)} required type="password" value={confirmPassword} />
            </label>

            {error && <p className="admin-error">{error}</p>}

            <button className="admin-button" disabled={loading} type="submit">
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="admin-auth-switch">
            Already have an account? <Link to="/admin/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminRegisterPage
