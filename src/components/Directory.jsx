import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Directory() {
  const [query, setQuery] = useState({ company: '', batch_year: '' })
  const [items, setItems] = useState([])

  const search = async () => {
    const params = new URLSearchParams()
    if (query.company) params.append('company', query.company)
    if (query.batch_year) params.append('batch_year', Number(query.batch_year))
    const res = await api(`/directory?${params.toString()}`)
    setItems(res)
  }

  useEffect(() => { search() }, [])

  return (
    <section id="directory" className="py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <label className="block text-sm text-blue-200 mb-1">Company</label>
              <input className="input w-full" value={query.company} onChange={e=>setQuery({...query, company:e.target.value})} placeholder="e.g., Google" />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Batch Year</label>
              <input className="input w-40" value={query.batch_year} onChange={e=>setQuery({...query, batch_year:e.target.value})} placeholder="e.g., 2020" />
            </div>
            <button onClick={search} className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">Search</button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((u) => (
              <div key={u.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white font-semibold">{u.name}</div>
                <div className="text-blue-200 text-sm">{u.department} • {u.batch_year || '—'}</div>
                <div className="mt-2 text-blue-100 text-sm">{u.current_company ? `${u.current_company} – ${u.designation || ''}` : 'No company listed'}</div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-blue-200">No results yet. Try adjusting filters.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
