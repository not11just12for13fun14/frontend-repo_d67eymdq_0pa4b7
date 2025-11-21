import { useEffect, useState } from 'react'
import { api, getUser, setAuth } from '../lib/api'

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-blue-300/80">{label}</div>
      <div className="text-white">{value || '—'}</div>
    </div>
  )
}

export default function Profile() {
  const [user, setUserState] = useState(getUser())
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(user || {})
  const [certOpen, setCertOpen] = useState(false)

  useEffect(() => {
    setForm(user || {})
  }, [user])

  const save = async () => {
    const email = user?.email
    if (!email) return
    const payload = { ...form }
    delete payload.email
    const res = await api(`/users/profile?email=${encodeURIComponent(email)}`, { method: 'PUT', body: payload })
    setUserState(res)
    setAuth(email, res)
    setEditing(false)
  }

  if (!user) return null

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Your Profile</h2>
          <div className="flex gap-2">
            <button onClick={() => setEditing(!editing)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">{editing ? 'Cancel' : 'Edit Profile'}</button>
            <button onClick={() => setCertOpen(true)} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white">Generate No-Dues Certificate</button>
          </div>
        </div>

        {!editing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Name" value={user.name} />
            <Field label="Email" value={user.email} />
            <Field label="Status" value={user.status} />
            <Field label="Batch Year" value={user.batch_year} />
            <Field label="Department" value={user.department} />
            <Field label="Company" value={user.current_company} />
            <Field label="Designation" value={user.designation} />
            <Field label="Phone" value={user.phone} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="input" value={form.name||''} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" />
            <input className="input" value={form.status||''} onChange={e=>setForm({...form, status:e.target.value})} placeholder="Status" />
            <input className="input" value={form.batch_year||''} onChange={e=>setForm({...form, batch_year:Number(e.target.value)||''})} placeholder="Batch Year" />
            <input className="input" value={form.department||''} onChange={e=>setForm({...form, department:e.target.value})} placeholder="Department" />
            <input className="input" value={form.current_company||''} onChange={e=>setForm({...form, current_company:e.target.value})} placeholder="Company" />
            <input className="input" value={form.designation||''} onChange={e=>setForm({...form, designation:e.target.value})} placeholder="Designation" />
            <input className="input" value={form.phone||''} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" />
            <button onClick={save} className="md:col-span-3 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Save Changes</button>
          </div>
        )}
      </div>

      {certOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={()=>setCertOpen(false)}>
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">No-Dues Certificate (Blockchain Verified)</h3>
              <button onClick={()=>setCertOpen(false)} className="text-sm text-gray-600">Close</button>
            </div>
            <div className="p-6">
              <img src="/certificate-demo.png" alt="Certificate" className="w-full rounded-md border" />
              <p className="mt-4 text-sm text-gray-600">
                This document is digitally signed and tamper-proof via Blockchain Integration.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
