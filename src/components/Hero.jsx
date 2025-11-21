import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight">
            AlumniConnect
          </h1>
          <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
            Centralized alumni data and instant engagement. Profiles, directory search, and targeted alerts in one place.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#auth" className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition">Get Started</a>
            <a href="#directory" className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition border border-white/20">Explore Directory</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
    </section>
  )
}
