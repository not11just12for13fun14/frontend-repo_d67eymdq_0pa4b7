import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Directory from './components/Directory'
import Engagement from './components/Engagement'
import { getUser, clearAuth } from './lib/api'

function Nav() {
  const link = 'px-3 py-2 rounded-lg text-sm text-blue-200 hover:text-white hover:bg-white/10 transition-colors'
  const active = 'bg-white/10 text-white shadow-sm shadow-blue-500/10'
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="text-white font-semibold tracking-tight flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          AlumniConnect
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink to="/directory" className={({isActive})=>`${link} ${isActive?active:''}`}>Directory</NavLink>
          <NavLink to="/engagement" className={({isActive})=>`${link} ${isActive?active:''}`}>Engagement</NavLink>
          <NavLink to="/profile" className={({isActive})=>`${link} ${isActive?active:''}`}>Profile</NavLink>
          <NavLink to="/auth" className={({isActive})=>`${link} ${isActive?active:''}`}>Login</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="pointer-events-none absolute inset-x-0 -top-8 mx-auto h-px w-11/12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-blue-200/80">
        <div className="flex items-center justify-center gap-4 mb-3 text-sm">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#directory" className="hover:text-white transition-colors">Directory</a>
          <a href="#events" className="hover:text-white transition-colors">Events</a>
        </div>
        Built for alumni networking • © {new Date().getFullYear()}
      </div>
    </footer>
  )
}

function SectionTitle({eyebrow, title, subtitle, id}) {
  return (
    <div id={id} className="max-w-6xl mx-auto px-4 text-center">
      {eyebrow ? <p className="text-blue-300/70 text-xs uppercase tracking-widest mb-2">{eyebrow}</p> : null}
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{title}</h2>
      {subtitle ? <p className="text-blue-200/80 max-w-3xl mx-auto">{subtitle}</p> : null}
    </div>
  )
}

function Features() {
  const items = [
    {
      title: 'Smart Profiles',
      desc: 'Keep your academic and professional journey up to date and discover meaningful connections.',
    },
    {
      title: 'Powerful Directory',
      desc: 'Search by company, department, or batch year to find the right alumni.',
    },
    {
      title: 'Event Engagement',
      desc: 'Get notified about events tailored to your interests and background.',
    },
    {
      title: 'Certificates',
      desc: 'Simulate blockchain-style certificates to celebrate milestones.',
    },
  ]
  return (
    <section className="py-14">
      <SectionTitle
        id="features"
        eyebrow="What you get"
        title="Everything you need to connect and grow"
        subtitle="A clean, modern experience with the essentials for alumni success"
      />
      <div className="max-w-6xl mx-auto px-4 mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((f, i) => (
          <div key={i} className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.15),transparent)]" />
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20 border border-white/20 flex items-center justify-center text-blue-200 mb-3 shadow-inner shadow-blue-500/20">{i+1}</div>
              <h3 className="text-white font-medium mb-1">{f.title}</h3>
              <p className="text-blue-200/80 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-cyan-500/10 p-8">
          <div className="absolute -inset-1 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.25),transparent,rgba(99,102,241,0.25))] opacity-20 blur-2xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">Ready to explore your network?</h3>
              <p className="text-blue-100/80">Create your profile and start connecting with alumni today.</p>
            </div>
            <div className="flex gap-3">
              <a href="/profile" className="px-4 py-2 rounded-lg bg-white text-slate-900 font-medium hover:bg-blue-50 transition-colors">Go to Profile</a>
              <a href="/directory" className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors">Browse Directory</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <section className="py-10">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-blue-200">
          Create your profile, search the directory, and receive targeted notifications about events and opportunities.
        </div>
      </section>
      <Features />
      <section id="directory" className="py-14">
        <SectionTitle title="Find people that matter" subtitle="Use filters like company and batch to quickly reach the right alumni" />
        <div className="max-w-6xl mx-auto px-4 mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-blue-200/90">
            <p className="mb-3">The directory makes discovery seamless.</p>
            <ul className="list-disc list-inside space-y-1 text-blue-200/80 text-sm">
              <li>Search by company or batch year</li>
              <li>View current roles and contact details</li>
              <li>Reach out and grow your network</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-blue-200/90">
            <p className="mb-3">Pro tip</p>
            <p className="text-sm">Keep your profile updated to appear in more searches and receive relevant event invites.</p>
          </div>
        </div>
      </section>
      <section id="events" className="py-14">
        <SectionTitle title="Stay in the loop" subtitle="Timely notifications for events you care about" />
        <div className="max-w-6xl mx-auto px-4 mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-blue-200/90">
              <div className="text-white font-medium mb-1">Campus Connect {i}</div>
              <div className="text-blue-200/70 text-sm">A curated session for alumni and students to exchange ideas.</div>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}

function ScrollTopButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
      aria-label="Back to top"
    >↑</button>
  )
}

export default function App() {
  const [user, setUser] = useState(getUser())
  const navigate = useNavigate()

  useEffect(() => {
    const onStorage = () => setUser(getUser())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const logout = () => {
    clearAuth()
    setUser(null)
    navigate('/')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute top-1/3 -left-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_300px_at_50%_-20px,rgba(59,130,246,0.12),transparent)]" />
      </div>

      <Nav />

      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<div className="max-w-3xl mx-auto px-4 py-10"><Auth onAuth={(u)=>{setUser(u); navigate('/profile')}} /></div>} />
          <Route path="/profile" element={<div className="max-w-5xl mx-auto px-4 py-10"><Profile /></div>} />
          <Route path="/directory" element={<div className="max-w-6xl mx-auto px-4 py-10"><Directory /></div>} />
          <Route path="/engagement" element={<div className="max-w-6xl mx-auto px-4 py-10"><Engagement /></div>} />
        </Routes>
      </main>

      <div className="max-w-6xl mx-auto px-4 flex justify-end gap-2">
        {user ? (
          <button onClick={logout} className="px-4 py-2 rounded-lg bg-white text-slate-900 font-medium hover:bg-blue-50 transition-colors">Logout</button>
        ) : null}
      </div>

      <Footer />
      <ScrollTopButton />

      <style>{`
        .input { @apply bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50; }
      `}</style>
    </div>
  )
}
