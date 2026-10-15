'use client'

import { useState } from 'react'
import { ArrowRight, Headphones, LockKeyhole, MessageCircle, ShieldCheck, Sparkles, Volume2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SeekerHome() {
  const [started, setStarted] = useState(false)
  return (
    <main className="seeker-shell">
      <header className="seeker-topbar"><Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>A quiet place to begin</small></div></Link><Link href="/login" className="seeker-login">Sign in <ArrowRight /></Link></header>
      <section className="seeker-hero">
        <div className="seeker-copy"><p className="eyebrow"><span className="live-dot" /> TALK HOURS · 7–11 PM IST</p><h1>You don&apos;t have to carry it alone.</h1><p className="seeker-lede">Talk to a trained listener who will meet you where you are. No name, number, or explanation needed to start.</p><div className="seeker-actions"><Button className="talk-now-button" onClick={() => setStarted(true)}><MessageCircle data-icon="inline-start" /> Talk now</Button><Link href="#how-it-works" className="quiet-link">How it works <ArrowRight /></Link></div><div className="privacy-line"><LockKeyhole /> Private by default · audio or chat · first talk is free</div></div>
        <div className="seeker-card"><div className="orb"><Headphones /></div><p className="eyebrow">A HUMAN IS HERE</p><h2>{started ? 'Finding your quiet match…' : 'A few minutes can change the weight of a day.'}</h2><p>{started ? 'You can use an alias. We&apos;ll keep your first step simple.' : 'No pressure to be positive. No pressure to have the right words.'}</p>{started ? <div className="alias-box"><Sparkles /><div><small>Your private alias</small><strong>QuietPine27</strong></div><span className="status-dot" /></div> : <div className="online-row"><span className="status-dot" /> 6 listeners online <span>~2 min wait</span></div>}</div>
      </section>
      <section className="seeker-trust" id="how-it-works"><div><ShieldCheck /><strong>Private</strong><span>Use an alias. No call logs.</span></div><div><Volume2 /><strong>Audio-first</strong><span>Chat or talk, your choice.</span></div><div><Sparkles /><strong>Gentle</strong><span>No diagnosis. Just a place to begin.</span></div></section>
      {started && <div className="seeker-queue"><div className="queue-spinner"><span /><span /><span /></div><div><strong>You&apos;re in the queue.</strong><p>Keep this tab open. We&apos;ll be with you soon.</p></div><Button variant="outline" onClick={() => setStarted(false)}>Leave queue</Button></div>}
    </main>
  )
}
