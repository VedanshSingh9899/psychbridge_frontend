'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  HeartHandshake,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Pause,
  Phone,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const queue = [
  { alias: 'MangoRiver', lang: 'Hindi', wait: '4 min', risk: 'High', kind: 'Returning', detail: 'Feeling overwhelmed after a difficult week' },
  { alias: 'BlueKite', lang: 'English', wait: '7 min', risk: 'Medium', kind: 'First time', detail: 'Wants someone to listen for a few minutes' },
  { alias: 'QuietFern', lang: 'Hindi', wait: '11 min', risk: 'Low', kind: 'First time', detail: 'Has been waiting since 8:42 PM' },
]

const clients = [
  { alias: 'SunlitPine', lang: 'English', risk: 'Medium', time: 'Today, 7:12 PM', hop: 'You' },
  { alias: 'MangoRiver', lang: 'Hindi', risk: 'High', time: 'Yesterday, 9:18 PM', hop: 'You' },
  { alias: 'SoftCloud', lang: 'Hindi', risk: 'Low', time: 'Mon, 8:40 PM', hop: 'You → Dr. N' },
]

function RiskBadge({ risk }: { risk: string }) {
  return <span className={`risk risk-${risk.toLowerCase()}`}>{risk}</span>
}

export function ListenerDesk() {
  const [availability, setAvailability] = useState<'Available' | 'Paused' | 'Full'>('Available')
  const [activeQueue, setActiveQueue] = useState(queue)
  const [session, setSession] = useState<(typeof queue)[number] | null>(null)
  const [activeNav, setActiveNav] = useState('Desk')
  const [note, setNote] = useState('')
  const [ended, setEnded] = useState(false)

  const queueLabel = useMemo(() => availability === 'Available' ? 'You are visible in the queue' : 'New cases are paused', [availability])

  function acceptNext() {
    const next = activeQueue[0]
    if (!next) return
    setActiveQueue((items) => items.slice(1))
    setSession(next)
    setEnded(false)
  }

  function endSession() {
    setEnded(true)
  }

  return (
    <main className="listener-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>Listener desk</small></div></div>
        <div className="profile-card"><div className="avatar avatar-lilac">AR</div><div><strong>Aarav R.</strong><small>Supervised listener</small></div><span className="online-dot" /></div>
        <nav className="nav-list" aria-label="Main navigation">
          {[['Desk', LayoutDashboard], ['My clients', Users], ['Schedule', Clock3], ['Briefs', BookOpen]].map(([label, Icon]) => (
            <button className={`nav-item ${activeNav === label ? 'nav-active' : ''}`} key={label as string} onClick={() => setActiveNav(label as string)}><Icon /><span>{label as string}</span>{label === 'Briefs' && <b>2</b>}</button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="supervision-card"><div className="mini-icon"><ShieldCheck /></div><div><strong>Supervision is on</strong><p>Ask for help anytime.</p></div><ChevronRight /></div>
        <button className="nav-item"><Settings2 /><span>Settings</span></button>
        <div className="sidebar-footer"><span className="status-dot" /> All systems calm <span>v1 pilot</span></div>
      </aside>

      <section className="desk-content">
        <header className="topbar"><div className="mobile-brand">PB Wellness</div><div className="breadcrumbs"><span>Listener desk</span><ChevronRight /><strong>{activeNav}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Search /></button><button className="icon-button notification" aria-label="Notifications"><Bell /><i /></button><div className="top-avatar">AR</div></div></header>

        {activeNav === 'Desk' ? <>
          <div className="page-heading"><div><p className="eyebrow">WEDNESDAY, OCTOBER 15 <span className="live-pill"><i /> LIVE</span></p><h1>Your desk, at your pace.</h1><p className="subheading">A calm place to help someone feel a little less alone.</p></div><button className="help-button"><CircleHelp /> Need help?</button></div>

          <section className="availability-panel"><div className="availability-copy"><div className="pulse-icon"><Activity /></div><div><p className="eyebrow">YOUR STATUS</p><h2>{availability}</h2><span>{queueLabel}</span></div></div><div className="availability-options">{(['Available', 'Paused', 'Full'] as const).map((status) => <button key={status} className={availability === status ? `availability-option selected ${status.toLowerCase()}` : 'availability-option'} onClick={() => setAvailability(status)}>{status === 'Available' ? <span className="status-dot" /> : status === 'Paused' ? <Pause /> : <X />}{status}</button>)}</div></section>

          <div className="stats-row"><div className="stat-card"><div className="stat-icon purple"><Users /></div><div><span>Waiting now</span><strong>{activeQueue.length + 2}</strong><small><span className="trend-up">+2</span> since 8 PM</small></div></div><div className="stat-card"><div className="stat-icon green"><HeartHandshake /></div><div><span>Helped tonight</span><strong>3</strong><small>2 min average wait</small></div></div><div className="stat-card"><div className="stat-icon gold"><Zap /></div><div><span>Your energy</span><strong>Good</strong><small>3 chats until breather</small></div></div></div>

          <div className="content-grid"><section className="queue-card"><div className="card-heading"><div><div className="title-with-live"><h2>People waiting</h2><span className="tiny-live"><i /> LIVE</span></div><p>Priority is sorted for you. No manual picking.</p></div><button className="more-button" aria-label="More options"><MoreHorizontal /></button></div><div className="queue-list">{activeQueue.map((person, index) => <article className={`queue-item ${index === 0 ? 'priority-item' : ''}`} key={person.alias}><div className="queue-number">{String(index + 1).padStart(2, '0')}</div><div className="queue-main"><div className="queue-title"><strong>{person.alias}</strong><RiskBadge risk={person.risk} /><span className="kind-label">{person.kind}</span></div><p>{person.detail}</p><div className="queue-meta"><span><Clock3 /> {person.wait} waiting</span><span><MessageCircle /> {person.lang}</span></div></div><ChevronRight className="queue-chevron" /></article>)}</div><div className="queue-footer"><span><span className="status-dot" /> Queue updates automatically</span><button onClick={() => setActiveQueue(queue)}>Refresh list</button></div></section>

            <aside className="right-column"><section className="accept-card"><div className="accept-glow" /><div className="card-heading"><div><p className="eyebrow">NEXT UP</p><h2>{activeQueue[0]?.alias ?? 'No one waiting'}</h2></div><span className="priority-label">Priority</span></div>{activeQueue[0] ? <><div className="greet-box"><Sparkles /><div><strong>Before you accept</strong><p>{activeQueue[0].kind} · {activeQueue[0].lang} · {activeQueue[0].wait} wait</p></div></div><Button className="accept-button" onClick={acceptNext}><HeartHandshake data-icon="inline-start" /> Accept next <span>↵</span></Button><p className="accept-note">Skip returns them to the front. No one is dropped.</p></> : <div className="empty-queue">You are all caught up.<br />Take a breather.</div>}</section><section className="clients-card"><div className="card-heading"><div><h2>My clients</h2><p>Your owned cases, kept private.</p></div><button className="text-button">View all <ChevronRight /></button></div><div className="client-list">{clients.map((client) => <div className="client-row" key={client.alias}><div className="avatar avatar-small">{client.alias.slice(0, 2)}</div><div className="client-info"><strong>{client.alias}</strong><span>{client.lang} · {client.time}</span></div><div className="client-risk"><RiskBadge risk={client.risk} /><small>{client.hop}</small></div></div>)}</div></section></aside>
          </div>
          <div className="bottom-note"><ShieldCheck /> <span><strong>Listener, not doctor.</strong> No diagnosis or medication advice here.</span><button>Read boundaries</button></div>
        </> : <div className="placeholder-page"><div className="placeholder-icon"><BookOpen /></div><h2>{activeNav}</h2><p>This part of the desk is ready for the next pilot step.</p><Button variant="outline" onClick={() => setActiveNav('Desk')}>Back to desk</Button></div>}
      </section>

      {session && <div className="session-overlay" role="dialog" aria-modal="true" aria-label="Active listening session"><div className="session-panel"><div className="session-top"><button className="close-session" onClick={() => setSession(null)} aria-label="Close session"><X /></button><div className="session-state"><span className="status-dot" /> Session live</div><span className="session-timer">06:42 <small>left</small></span></div><div className="session-person"><div className="avatar avatar-large">{session.alias.slice(0, 2)}</div><div><p className="eyebrow">ANONYMOUS SESSION</p><h2>{session.alias}</h2><p>{session.lang} · {session.kind} · <RiskBadge risk={session.risk} /></p></div></div><div className="session-safety"><ShieldCheck /><span>Private by default. No names, photos, or phone numbers.</span></div><div className="chat-area"><div className="chat-time">Today, 9:14 PM</div><div className="bubble bubble-them">Hi. I don't really know where to start.</div><div className="bubble bubble-me">That&apos;s okay. We can take it one small step at a time. I&apos;m here to listen.</div><div className="bubble bubble-them">I&apos;ve been carrying a lot this week.</div>{ended && <div className="ended-note"><Check /> Session ended. Add a private note below.</div>}</div>{ended ? <div className="wrap-area"><label htmlFor="private-note">Private end-note <span>Only visible to you</span></label><textarea id="private-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="What would be useful to remember?" /><div className="wrap-actions"><Button variant="outline" onClick={() => setSession(null)}>Close case</Button><Button onClick={() => setSession(null)}>Save & close</Button></div></div> : <div className="composer"><button aria-label="Voice message"><Phone /></button><input placeholder="Write a gentle reply..." /><button className="send-button" aria-label="Send"><ChevronRight /></button></div>}<div className="session-footer"><span><ShieldCheck /> Listener, not doctor</span>{!ended && <Button variant="outline" onClick={endSession}>End session</Button>}</div></div></div>}
    </main>
  )
}

export default ListenerDesk
