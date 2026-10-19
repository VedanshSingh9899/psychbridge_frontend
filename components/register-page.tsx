'use client'

import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'listener' | 'coordinator'>('listener')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="auth-shell">
      <section className="auth-visual">
        <Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>A calmer way forward</small></div></Link>
        <div className="auth-story">
          <p className="eyebrow">JOIN THE CARE NETWORK</p>
          <h1>Make room for a better kind of care.</h1>
          <p>Build a private, trusted practice where every handoff feels human and every person feels held.</p>
          <ul className="auth-benefits">
            <li><span><Check /></span><div><strong>Warm referrals, not cold leads</strong><small>Receive context before the first conversation.</small></div></li>
            <li><span><Check /></span><div><strong>Your practice, your boundaries</strong><small>Set your availability, languages and capacity.</small></div></li>
            <li><span><Check /></span><div><strong>Privacy by default</strong><small>Minimal information, thoughtful notifications.</small></div></li>
          </ul>
        </div>
        <div className="auth-trust"><ShieldCheck /> Built for care teams who put people first</div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="mobile-login-brand"><Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>Private workspace</small></div></Link></div>
          <p className="eyebrow">CREATE YOUR WORKSPACE</p>
          <h2>Start with PB Wellness</h2>
          <p className="login-subtitle">Already part of the network? <Link href="/login">Sign in instead</Link>.</p>
          {submitted ? (
            <div className="auth-success"><div className="success-icon"><Check /></div><h3>Request received</h3><p>Thanks for joining the care network. We&apos;ll review your details and be in touch soon.</p><Button asChild><Link href="/login">Back to sign in <ArrowRight data-icon="inline-end" /></Link></Button></div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form register-form">
              <div className="register-name-grid"><div><label className="login-label" htmlFor="first-name">First name</label><input className="login-input" id="first-name" required placeholder="Aarav" /></div><div><label className="login-label" htmlFor="last-name">Last name</label><input className="login-input" id="last-name" required placeholder="Sharma" /></div></div>
              <label className="login-label" htmlFor="register-email">Work email</label><input className="login-input" id="register-email" type="email" required placeholder="you@example.com" />
              <label className="login-label" htmlFor="register-password">Create password</label><div className="password-wrap"><input className="login-input" id="register-password" type={showPassword ? 'text' : 'password'} required minLength={8} placeholder="At least 8 characters" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button></div>
              <label className="login-label">I&apos;m joining as</label><div className="role-switch" role="tablist" aria-label="Workspace type"><button type="button" className={role === 'listener' ? 'role-selected' : ''} onClick={() => setRole('listener')}>Listener</button><button type="button" className={role === 'coordinator' ? 'role-selected' : ''} onClick={() => setRole('coordinator')}>Coordinator</button></div>
              <label className="consent-row"><input type="checkbox" required /> <span>I agree to the <Link href="#guidelines">privacy-first care guidelines</Link> and workspace terms.</span></label>
              <Button className="login-submit" type="submit">Create workspace <ArrowRight data-icon="inline-end" /></Button>
            </form>
          )}
          <div className="auth-note"><LockKeyhole /> Your details stay private and are only used to set up your workspace.</div>
        </div>
      </section>
    </main>
  )
}
