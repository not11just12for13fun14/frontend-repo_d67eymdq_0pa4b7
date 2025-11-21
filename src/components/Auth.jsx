import { useState } from 'react'
import { api, setAuth } from '../lib/api'

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '', email: '', status: 'alumnus', phone: '', batch_year: '', department: '', current_company: '', designation: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (mode === 'signup') {
        const payload = { ...form, batch_year: form.batch_year ? Number(form.batch_year) : undefined }
        const res = await api('/auth/signup', { method: 'POST', body: payload })
        setAuth(res.token, res.user)
        onAuth(res.user)
      } else {
        const res = await api('/auth/login', { method: 'POST', body: { email: form.email } })
        setAuth(res.token, res.user)
        onAuth(res.user)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="auth" className="py-10">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{mode === 'signup' ? 'Create your profile' : 'Welcome back'}</h2>
          <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')} className="text-blue-300 hover:text-blue-200 text-sm">
            {mode === 'signup' ? 'Have an account? Log in' : "New here? Sign up"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mode === 'signup' && (
            <>
              <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
              <select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                <option value="alumnus">Alumnus</option>
                <option value="student">Student</option>
              </select>
              <input className="input" placeholder="Batch year" value={form.batch_year} onChange={e=>setForm({...form, batch_year:e.target.value})} />
              <input className="input" placeholder="Department" value={form.department} onChange={e=>setForm({...form, department:e.target.value})} />
              <input className="input" placeholder="Current company" value={form.current_company} onChange={e=>setForm({...form, current_company:e.target.value})} />
              <input className="input" placeholder="Designation" value={form.designation} onChange={e=>setForm({...form, designation:e.target.value})} />
              <input className="input md:col-span-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            </>
          )}
          <input className="input md:col-span-2" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />

          {error && <div className="md:col-span-2 text-red-300 text-sm">{error}</div>}

          <button disabled={loading} className="md:col-span-2 px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition">
            {loading ? 'Please wait…' : (mode === 'signup' ? 'Create account' : 'Log in')}
          </button>
        </form>
      </div>
    </section>
  )
}
