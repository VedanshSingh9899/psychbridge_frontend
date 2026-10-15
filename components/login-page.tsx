'use client'

import { ArrowRight, Headphones, LockKeyhole, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [role, setRole] = useState<'listener' | 'coordinator'>('listener')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.href = role === 'listener' ? '/' : '/admin'
  }

  return (
    <main className="login-shell">
      <div className="login-visual">
        <Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>A calmer way forward</small></div></Link>
        <div className="login-quote"><p className="eyebrow">WELCOME BACK</p><h1>Care works better when no one carries it alone.</h1><p>Sign in to your private workspace. Seekers can always start a first talk without an account.</p></div>
        <div className="login-safety"><ShieldCheck /> Your workspace is private by default</div>
      </div>
      <section className="login-panel">
        <div className="login-panel-inner">
          <div className="mobile-login-brand"><Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>Private workspace</small></div></Link></div>
          <p className="eyebrow">PRIVATE WORKSPACE</p>
          <h2>Sign in to continue</h2>
          <p className="login-subtitle">For listeners and coordinators. Seekers can <Link href="/seeker">start a talk without signing in</Link>.</p>
          <div className="role-switch" role="tablist" aria-label="Workspace type">
            <button type="button" className={role === 'listener' ? 'role-selected' : ''} onClick={() => setRole('listener')}><Headphones /> Listener</button>
            <button type="button" className={role === 'coordinator' ? 'role-selected' : ''} onClick={() => setRole('coordinator')}>Coordinator</button>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label" htmlFor="email">Work email</label>
            <input className="login-input" id="email" name="email" type="email" placeholder="you@example.com" required />
            <label className="login-label" htmlFor="password">Password</label>
            <input className="login-input" id="password" name="password" type="password" placeholder="Enter your password" required />
            <div className="login-options"><label><input type="checkbox" /> Remember this device</label><button type="button">Forgot password?</button></div>
            <Button className="login-submit" type="submit">Sign in <ArrowRight data-icon="inline-end" /></Button>
          </form>
          <div className="login-divider"><span>or</span></div>
          <Button variant="outline" className="guest-button" asChild><Link href="/seeker"><LockKeyhole data-icon="inline-start" /> Continue as seeker</Link></Button>
          <p className="login-footer">By continuing, you agree to our privacy-first care guidelines.</p>
        </div>
      </section>
    </main>
  )
}
