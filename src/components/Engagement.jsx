import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Bell } from 'lucide-react'

export default function Engagement() {
  const [open, setOpen] = useState(false)
  const [eventItem, setEventItem] = useState(null)

  useEffect(() => {
    (async () => {
      const events = await api('/events')
      setEventItem(events[0])
    })()
  }, [])

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6">
        <div>
          <h3 className="text-white font-semibold text-lg">Engagement Channel</h3>
          <p className="text-blue-200 text-sm">Simulate instant targeted alert delivery</p>
        </div>
        <button onClick={() => setOpen(true)} className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
          <Bell className="w-5 h-5" />
          <span>Event Notification</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Simulated WhatsApp Alert</h3>
              <button onClick={()=>setOpen(false)} className="text-sm text-gray-600">Close</button>
            </div>
            <div className="p-6">
              <div className="rounded-lg border p-4 bg-green-50 border-green-200">
                <div className="text-sm text-gray-700">
                  You have a new alert! (Simulated WhatsApp Alert)
                </div>
                <div className="mt-2 font-semibold">
                  Event - {eventItem?.title || 'Annual Alumni Meet'}
                </div>
                <div className="text-sm text-gray-600">Tap to RSVP. Audience: {eventItem?.audience || 'All'}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
