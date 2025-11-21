import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Directory from './components/Directory'
import Engagement from './components/Engagement'
import { getUser, clearAuth } from './lib/api'

function Nav() {
  const link = 'px-3 py-2 rounded-lg text-sm text-blue-200 hover:text-white hover:bg-white/10'
  const active = 'bg-white/10 text-white'
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="text-white font-semibold tracking-tight">AlumniConnect</NavLink>
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
    <footer className="mt-16 border-t border-white/10 py-10 text-center text-blue-200/80">
      Built for alumni networking • © {new Date().getFullYear()}
    </footer>
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
    </>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Nav />

      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<div className="max-w-3xl mx-auto px-4"><Auth onAuth={(u)=>{setUser(u); navigate('/profile')}} /></div>} />
          <Route path="/profile" element={<div className="max-w-5xl mx-auto px-4"><Profile /></div>} />
          <Route path="/directory" element={<div className="max-w-6xl mx-auto px-4"><Directory /></div>} />
          <Route path="/engagement" element={<div className="max-w-6xl mx-auto px-4"><Engagement /></div>} />
        </Routes>
      </main>

      <div className="max-w-6xl mx-auto px-4 flex justify-end gap-2">
        {user ? (
          <button onClick={logout} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">Logout</button>
        ) : null}
      </div>

      <Footer />

      <style>{`
        .input { @apply bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50; }
      `}</style>
    </div>
  )
}
