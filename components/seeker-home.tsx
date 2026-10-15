'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Check,
  Headphones,
  HeartHandshake,
  LockKeyhole,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Wind,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type PortalView = 'home' | 'sessions' | 'resources'

const resources = [
  { title: 'A softer way back to sleep', meta: 'Audio · 8 min', tone: 'violet' },
  { title: 'When everything feels like too much', meta: 'Guided pause · 4 min', tone: 'green' },
  { title: 'You are allowed to take up space', meta: 'Reflection · 3 min', tone: 'gold' },
]

export default function SeekerHome() {
  const [view, setView] = useState<PortalView>('home')
  const [started, setStarted] = useState(false)

  return (
    <main className="portal-shell">
      <header className="portal-header">
        <Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>A quiet place to begin</small></div></Link>
        <nav className="portal-nav" aria-label="Seeker portal navigation">
          {([['home', 'My space'], ['sessions', 'Sessions'], ['resources', 'Resources']] as const).map(([id, label]) => (
            <button key={id} className={view === id ? 'portal-nav-active' : ''} onClick={() => setView(id)}>{label}</button>
          ))}
        </nav>
        <Link href="/login" className="seeker-login">Sign out <ArrowRight /></Link>
      </header>

      <div className="portal-content">
        {view === 'home' && <>
          <section className="portal-welcome">
            <div><p className="eyebrow">THURSDAY · OCTOBER 15</p><h1>Good to see you, QuietPine.</h1><p>There is no right way to feel today. We can start exactly where you are.</p></div>
            <div className="streak-card"><Sparkles /><strong>3 days</strong><span>of showing up for yourself</span></div>
          </section>

          <section className="portal-stats" aria-label="Your progress">
            <div><span>SESSIONS COMPLETED</span><strong>4</strong><small>+2 this month</small></div>
            <div><span>TIME FOR YOURSELF</span><strong>1h 18m</strong><small>Across 6 check-ins</small></div>
            <div><span>PROFILE PROGRESS</span><strong>72%</strong><small>Almost there</small></div>
          </section>

          <section className="portal-grid">
            <article className="next-talk-card">
              <div className="card-kicker"><span className="live-dot" /> LISTENERS ARE HERE</div>
              <h2>How are you arriving today?</h2>
              <p>Choose a quiet conversation with a trained listener. You can leave whenever you need.</p>
              <div className="talk-options"><Button className="talk-now-button" onClick={() => setStarted(true)}><MessageCircle data-icon="inline-start" /> Talk now</Button><button className="audio-option"><Headphones /> Audio</button></div>
              {started && <div className="queue-confirm"><Check /><span><strong>You&apos;re in the queue.</strong> About 2 minutes to connect.</span><button onClick={() => setStarted(false)}>Leave</button></div>}
            </article>
            <article className="checkin-card"><div className="card-icon"><Wind /></div><p className="eyebrow">A SMALL CHECK-IN</p><h2>What would feel supportive?</h2><p>Noticing is enough. You don&apos;t have to solve anything here.</p><div className="checkin-choices"><button>To be heard</button><button>To feel calmer</button><button>Not sure yet</button></div></article>
          </section>

          <section className="portal-section"><div className="section-heading"><div><p className="eyebrow">FOR YOUR NEXT MOMENT</p><h2>Gentle resources</h2></div><button onClick={() => setView('resources')}>See all <ArrowRight /></button></div><div className="resource-grid">{resources.map((resource) => <article className={`resource-card ${resource.tone}`} key={resource.title}><div className="resource-play"><Play fill="currentColor" /></div><div><h3>{resource.title}</h3><p>{resource.meta}</p></div></article>)}</div></section>
        </>}

        {view === 'sessions' && <section className="portal-page"><p className="eyebrow">YOUR JOURNEY</p><h1>Sessions</h1><p className="portal-intro">A private record of the moments you chose yourself.</p><div className="session-history"><div className="history-item"><div className="history-icon"><HeartHandshake /></div><div><strong>Talk with Willow</strong><span>Tuesday, October 13 · 24 minutes</span></div><Check /></div><div className="history-item"><div className="history-icon"><MessageCircle /></div><div><strong>Talk with River</strong><span>Sunday, October 11 · 18 minutes</span></div><Check /></div></div></section>}

        {view === 'resources' && <section className="portal-page"><p className="eyebrow">A LITTLE ROOM TO BREATHE</p><h1>Resources</h1><p className="portal-intro">Short, gentle things for the in-between moments.</p><div className="resource-list">{resources.concat([{ title: 'A note for the hard mornings', meta: 'Reflection · 5 min', tone: 'blue' }]).map((resource) => <article className={`resource-card ${resource.tone}`} key={resource.title}><div className="resource-play"><Play fill="currentColor" /></div><div><h3>{resource.title}</h3><p>{resource.meta}</p></div><ArrowRight /></article>)}</div></section>}
      </div>

      <footer className="portal-footer"><span><LockKeyhole /> Your space is private by default</span><span><ShieldCheck /> No diagnosis. No pressure.</span><Link href="/">Need a different kind of help? <ArrowRight /></Link></footer>
    </main>
  )
}
