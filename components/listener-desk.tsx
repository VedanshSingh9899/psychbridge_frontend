'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
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
  { alias: 'SunlitPine', lang: 'English', risk: 'Medium', time: 'Today, 7:12 PM', hop: 'You', diagnosis: 'Anxiety symptoms', lastSeen: 'Today, 7:12 PM', sessions: 8, summary: 'Working through exam pressure and sleep disruption.', history: ['Listener check-in completed', 'Breathing routine shared', 'Follow-up with Dr. Nisha scheduled'] },
  { alias: 'MangoRiver', lang: 'Hindi', risk: 'High', time: 'Yesterday, 9:18 PM', hop: 'You', diagnosis: 'Acute stress response', lastSeen: 'Yesterday, 9:18 PM', sessions: 12, summary: 'Feeling overwhelmed after a difficult week.', history: ['Safety check completed', 'High-risk handoff sent to Dr. Mehta', 'Supervision review pending'] },
  { alias: 'SoftCloud', lang: 'Hindi', risk: 'Low', time: 'Mon, 8:40 PM', hop: 'You → Dr. N', diagnosis: 'Low mood', lastSeen: 'Mon, 8:40 PM', sessions: 5, summary: 'Building a steady support routine with weekly listening.', history: ['First conversation completed', 'Resource brief shared', 'Case reviewed with Dr. N'] },
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
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [showLogin, setShowLogin] = useState(false)
  const [selectedClient, setSelectedClient] = useState<(typeof clients)[number] | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const queueLabel = useMemo(() => availability === 'Available' ? 'You are visible in the queue' : 'New cases are paused', [availability])

  function acceptNext() {
    if (sessionsCompleted > 0) {
      setShowLogin(true)
      return
    }
    const next = activeQueue[0]
    if (!next) return
    setActiveQueue((items) => items.slice(1))
    setSession(next)
    setEnded(false)
  }

  function endSession() {
    setEnded(true)
    setSessionsCompleted((count) => count + 1)
  }

  return (
    <main className="listener-shell">
      <aside className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="brand-row"><button className="brand-mark" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}><span>pb</span><div className="sidebar-label"><strong>PB Wellness</strong><small>Listener desk</small></div></button></div>
        <div className="profile-card"><div className="avatar avatar-lilac">AR</div><div className="sidebar-label"><strong>Aarav R.</strong><small>Supervised listener</small></div><span className="online-dot" /></div>
        <nav className="nav-list" aria-label="Main navigation">
          {[['Desk', LayoutDashboard], ['Analytics', BarChart3], ['My clients', Users], ['Schedule', Clock3], ['Briefs', BookOpen]].map(([label, Icon]) => (
            <button className={`nav-item ${activeNav === label ? 'nav-active' : ''}`} key={label as string} onClick={() => setActiveNav(label as string)} aria-label={label as string}><Icon /><span className="sidebar-label">{label as string}</span>{label === 'Briefs' && <b className="sidebar-label">2</b>}</button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="supervision-card"><div className="mini-icon"><ShieldCheck /></div><div className="sidebar-label"><strong>Supervision is on</strong><p>Ask for help anytime.</p></div><ChevronRight /></div>
        <button className="nav-item" aria-label="Settings"><Settings2 /><span className="sidebar-label">Settings</span></button>
        <div className="sidebar-footer"><span className="status-dot" /><span className="sidebar-label">All systems calm</span><span className="sidebar-label">v1 pilot</span></div>
      </aside>

      <section className="desk-content">
        <header className="topbar"><div className="mobile-brand">PB Wellness</div><div className="breadcrumbs"><span>Listener desk</span><ChevronRight /><strong>{activeNav}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Search /></button><button className="icon-button notification" aria-label="Notifications"><Bell /><i /></button><div className="top-avatar">AR</div></div></header>

        {activeNav === 'Desk' ? <>
          <div className="page-heading"><div><p className="eyebrow">WEDNESDAY, OCTOBER 15 <span className="live-pill"><i /> LIVE</span></p><h1>Your desk, at your pace.</h1><p className="subheading">A calm place to help someone feel a little less alone.</p></div><button className="help-button"><CircleHelp /> Need help?</button></div>

          <section className="availability-panel"><div className="availability-copy"><div className="pulse-icon"><Activity /></div><div><p className="eyebrow">YOUR STATUS</p><h2>{availability}</h2><span>{queueLabel}</span></div></div><div className="availability-options">{(['Available', 'Paused', 'Full'] as const).map((status) => <button key={status} className={availability === status ? `availability-option selected ${status.toLowerCase()}` : 'availability-option'} onClick={() => setAvailability(status)}>{status === 'Available' ? <span className="status-dot" /> : status === 'Paused' ? <Pause /> : <X />}{status}</button>)}</div></section>

          <div className="stats-row"><div className="stat-card"><div className="stat-icon purple"><Users /></div><div><span>Waiting now</span><strong>{activeQueue.length + 2}</strong><small><span className="trend-up">+2</span> since 8 PM</small></div></div><div className="stat-card"><div className="stat-icon green"><HeartHandshake /></div><div><span>Helped tonight</span><strong>3</strong><small>2 min average wait</small></div></div><div className="stat-card"><div className="stat-icon gold"><Zap /></div><div><span>Your energy</span><strong>Good</strong><small>3 chats until breather</small></div></div></div>

          <div className="content-grid"><section className="queue-card"><div className="card-heading"><div><div className="title-with-live"><h2>People waiting</h2><span className="tiny-live"><i /> LIVE</span></div><p>Priority is sorted for you. No manual picking.</p></div><button className="more-button" aria-label="More options"><MoreHorizontal /></button></div><div className="queue-list">{activeQueue.map((person, index) => <article className={`queue-item ${index === 0 ? 'priority-item' : ''}`} key={person.alias}><div className="queue-number">{String(index + 1).padStart(2, '0')}</div><div className="queue-main"><div className="queue-title"><strong>{person.alias}</strong><RiskBadge risk={person.risk} /><span className="kind-label">{person.kind}</span></div><p>{person.detail}</p><div className="queue-meta"><span><Clock3 /> {person.wait} waiting</span><span><MessageCircle /> {person.lang}</span></div></div><ChevronRight className="queue-chevron" /></article>)}</div><div className="queue-footer"><span><span className="status-dot" /> Queue updates automatically</span><button onClick={() => setActiveQueue(queue)}>Refresh list</button></div></section>

            <aside className="right-column"><section className="accept-card"><div className="accept-glow" /><div className="card-heading"><div><p className="eyebrow">NEXT UP</p><h2>{activeQueue[0]?.alias ?? 'No one waiting'}</h2></div><span className="priority-label">Priority</span></div>{activeQueue[0] ? <><div className="greet-box"><Sparkles /><div><strong>Before you accept</strong><p>{activeQueue[0].kind} · {activeQueue[0].lang} · {activeQueue[0].wait} wait</p></div></div><Button className="accept-button" onClick={acceptNext}><HeartHandshake data-icon="inline-start" /> Accept next <span>↵</span></Button><p className="accept-note">Skip returns them to the front. No one is dropped.</p></> : <div className="empty-queue">You are all caught up.<br />Take a breather.</div>}</section><section className="clients-card"><div className="card-heading"><div><h2>My clients</h2><p>Your owned cases, kept private.</p></div><button className="text-button">View all <ChevronRight /></button></div><div className="client-list">{clients.map((client) => <button className="client-row client-row-button" key={client.alias} onClick={() => setSelectedClient(client)} aria-label={`Open history for ${client.alias}`}><div className="avatar avatar-small">{client.alias.slice(0, 2)}</div><div className="client-info"><strong>{client.alias}</strong><span>{client.lang} · {client.time}</span></div><div className="client-risk"><RiskBadge risk={client.risk} /><small>{client.hop}</small></div></button>)}</div></section></aside>
          </div>
          <div className="bottom-note"><ShieldCheck /> <span><strong>Listener, not doctor.</strong> No diagnosis or medication advice here.</span><button>Read boundaries</button></div>
        </> : activeNav === 'My clients' ? <section className="analytics-page clients-page"><div className="page-heading"><div><p className="eyebrow">YOUR CASELOAD</p><h1>My clients</h1><p className="subheading">Open a client to review their supervised listening history and current care context.</p></div><div className="period-chip">19 active cases <Users /></div></div><div className="client-directory">{clients.map((client) => <button className="directory-client" key={client.alias} onClick={() => setSelectedClient(client)}><div className="avatar avatar-small">{client.alias.slice(0, 2)}</div><div><strong>{client.alias}</strong><span>{client.lang} · Last seen {client.lastSeen}</span><small>{client.summary}</small></div><div className="directory-meta"><RiskBadge risk={client.risk} /><span>{client.sessions} sessions</span><ChevronRight /></div></button>)}</div></section> : activeNav === 'Analytics' ? <section className="analytics-page"><div className="page-heading"><div><p className="eyebrow">YOUR IMPACT</p><h1>Work that grows trust.</h1><p className="subheading">A private view of your listening work and psychologist handoffs.</p></div><div className="period-chip">Last 30 days <ChevronRight /></div></div><div className="stats-row"><div className="stat-card"><div className="stat-icon purple"><HeartHandshake /></div><div><span>Sessions completed</span><strong>24</strong><small><span className="trend-up">+18%</span> from last month</small></div></div><div className="stat-card"><div className="stat-icon green"><Users /></div><div><span>People supported</span><strong>19</strong><small>16 first conversations</small></div></div><div className="stat-card"><div className="stat-icon gold"><ShieldCheck /></div><div><span>Psychologist handoffs</span><strong>7</strong><small>All reviewed by supervision</small></div></div></div><div className="analytics-grid"><section className="queue-card impact-card"><div className="card-heading"><div><h2>Support activity</h2><p>Your completed listening sessions by week.</p></div><BarChart3 /></div><div className="bar-chart" aria-label="Support activity chart"><div className="bar-group"><span style={{height: '42%'}} /><small>W1</small></div><div className="bar-group"><span style={{height: '65%'}} /><small>W2</small></div><div className="bar-group"><span style={{height: '53%'}} /><small>W3</small></div><div className="bar-group"><span style={{height: '82%'}} /><small>W4</small></div></div></section><section className="queue-card handoff-card"><div className="card-heading"><div><h2>With psychologists</h2><p>Recent collaboration and next steps.</p></div></div><div className="handoff-row"><div className="avatar avatar-small">DN</div><div><strong>Dr. Nisha Mehta</strong><span>3 cases reviewed · Today</span></div><RiskBadge risk="High" /></div><div className="handoff-row"><div className="avatar avatar-small">DK</div><div><strong>Dr. Kabir Shah</strong><span>2 cases reviewed · Yesterday</span></div><RiskBadge risk="Medium" /></div><div className="handoff-row"><div className="avatar avatar-small">SC</div><div><strong>Supervision circle</strong><span>Weekly reflection · Monday</span></div><RiskBadge risk="Low" /></div></section></div><div className="bottom-note"><ShieldCheck /> <span><strong>Your notes stay private.</strong> Analytics show patterns, never conversation content.</span><button>Privacy details</button></div></section> : <div className="placeholder-page"><div className="placeholder-icon"><BookOpen /></div><h2>{activeNav}</h2><p>This part of the desk is ready for the next pilot step.</p><Button variant="outline" onClick={() => setActiveNav('Desk')}>Back to desk</Button></div>}
      </section>

      {activeNav === 'Analytics' && <section className="queue-card analytics-detail-card"><div className="card-heading"><div><h2>Case health overview</h2><p>Current concern level and clinical context from supervised handoffs.</p></div><ShieldCheck /></div><div className="health-grid"><div><span className="health-number critical">3</span><strong>Critical</strong><small>Immediate psychologist review</small></div><div><span className="health-number watch">8</span><strong>Needs attention</strong><small>Follow-up within 48 hours</small></div><div><span className="health-number steady">8</span><strong>Stable</strong><small>Continuing listener support</small></div></div><div className="diagnosis-list"><div className="diagnosis-row"><span>Anxiety symptoms</span><b>7 cases</b><i><em style={{width: '72%'}} /></i></div><div className="diagnosis-row"><span>Acute stress response</span><b>5 cases</b><i><em style={{width: '54%'}} /></i></div><div className="diagnosis-row"><span>Low mood</span><b>4 cases</b><i><em style={{width: '43%'}} /></i></div></div></section>}

      {activeNav === 'Schedule' && <section className="analytics-page schedule-page"><div className="page-heading"><div><p className="eyebrow">YOUR WEEK</p><h1>Schedule</h1><p className="subheading">Keep listening balanced with supervision, breaks, and follow-ups.</p></div><div className="period-chip">Wednesday, Oct 15 <Clock3 /></div></div><div className="schedule-layout"><section className="queue-card"><div className="card-heading"><div><h2>Today</h2><p>Three moments on your desk.</p></div><span className="schedule-count">3 planned</span></div><div className="schedule-list"><div className="schedule-item schedule-active"><div className="schedule-time"><strong>09:30</strong><span>AM</span></div><div className="schedule-marker"><span /></div><div className="schedule-copy"><strong>Listener desk open</strong><p>Available for new conversations · 2 hours</p></div><RiskBadge risk="Low" /></div><div className="schedule-item"><div className="schedule-time"><strong>12:30</strong><span>PM</span></div><div className="schedule-marker"><span /></div><div className="schedule-copy"><strong>Break and reset</strong><p>Step away, hydrate, and check your energy.</p></div><span className="schedule-muted">30 min</span></div><div className="schedule-item"><div className="schedule-time"><strong>04:00</strong><span>PM</span></div><div className="schedule-marker"><span /></div><div className="schedule-copy"><strong>Supervision with Dr. Mehta</strong><p>Review 2 handoffs and MangoRiver&apos;s next step.</p></div><span className="schedule-muted">45 min</span></div></div></section><aside className="schedule-side"><section className="accept-card"><div className="card-heading"><div><p className="eyebrow">UP NEXT</p><h2>Supervision review</h2></div><ShieldCheck /></div><p className="schedule-side-copy">Bring the critical case notes and any safety questions from this week.</p><button className="text-button">View preparation <ChevronRight /></button></section><section className="queue-card week-card"><div className="card-heading"><div><h2>This week</h2><p>A gentle pace is a safe pace.</p></div></div><div className="week-stats"><div><strong>14</strong><span>hours listening</span></div><div><strong>2</strong><span>supervisions</span></div></div></section></aside></div></section>}

      {activeNav === 'Briefs' && <section className="analytics-page briefs-page"><div className="page-heading"><div><p className="eyebrow">SUPERVISION NOTES</p><h1>Briefs for safer listening.</h1><p className="subheading">Practical guidance for the moments that need a steadier response.</p></div><div className="period-chip">2 unread <BookOpen /></div></div><div className="brief-list"><article className="brief-card brief-urgent"><span className="brief-tag">URGENT · 2 UNREAD</span><h2>When a case feels critical</h2><p>Use the safety check, stay present, and request a psychologist handoff. Listeners do not diagnose or provide treatment plans.</p><div className="brief-footer"><span>Updated today · 4 min read</span><button className="text-button">Read brief <ChevronRight /></button></div></article><article className="brief-card"><span className="brief-tag">NEW THIS WEEK</span><h2>Reflective listening prompts</h2><p>Simple prompts for slowing down, validating feelings, and helping someone name what they need next.</p><div className="brief-footer"><span>For every conversation</span><button className="text-button">Open brief <ChevronRight /></button></div></article><article className="brief-card"><span className="brief-tag">SUPERVISION TOOLKIT</span><h2>Handoff checklist</h2><p>Capture what was heard, what changed, and why a psychologist should review the case next.</p><div className="brief-footer"><span>Private workflow guide</span><button className="text-button">Open brief <ChevronRight /></button></div></article></div></section>}

      {selectedClient && <div className="session-overlay" role="dialog" aria-modal="true" aria-label={`History for ${selectedClient.alias}`}><div className="client-history-panel"><button className="close-session" onClick={() => setSelectedClient(null)} aria-label="Close client history"><X /></button><div className="session-person"><div className="avatar avatar-large">{selectedClient.alias.slice(0, 2)}</div><div><p className="eyebrow">CLIENT HISTORY</p><h2>{selectedClient.alias}</h2><p>{selectedClient.lang} · <RiskBadge risk={selectedClient.risk} /></p></div></div><div className="history-summary"><div><span>Case health</span><strong>{selectedClient.risk}</strong></div><div><span>Sessions</span><strong>{selectedClient.sessions}</strong></div><div><span>Diagnosis context</span><strong>{selectedClient.diagnosis}</strong></div></div><p className="history-description">{selectedClient.summary}</p><div className="history-timeline">{selectedClient.history.map((item, index) => <div className="history-event" key={item}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item}</strong><small>{index === 0 ? selectedClient.lastSeen : 'Previous case note'}</small></div></div>)}</div><div className="bottom-note"><ShieldCheck /><span><strong>Confidential case view.</strong> Clinical decisions stay with the psychologist.</span></div></div></div>}

      {showLogin && <div className="session-overlay" role="dialog" aria-modal="true" aria-label="Listener sign in"><div className="login-prompt"><button className="close-session" onClick={() => setShowLogin(false)} aria-label="Close sign in"><X /></button><div className="placeholder-icon"><ShieldCheck /></div><p className="eyebrow">WELCOME BACK</p><h2>Sign in to keep listening.</h2><p>Your first conversation is always open. Create an account to continue helping people, keep your private notes, and see your impact over time.</p><input aria-label="Email address" placeholder="Email address" type="email" /><Button onClick={() => setShowLogin(false)}>Continue with email</Button><small>We only use your account to protect your work and supervision history.</small></div></div>}

      {session && <div className="session-overlay" role="dialog" aria-modal="true" aria-label="Active listening session"><div className="session-panel"><div className="session-top"><button className="close-session" onClick={() => setSession(null)} aria-label="Close session"><X /></button><div className="session-state"><span className="status-dot" /> Session live</div><span className="session-timer">06:42 <small>left</small></span></div><div className="session-person"><div className="avatar avatar-large">{session.alias.slice(0, 2)}</div><div><p className="eyebrow">ANONYMOUS SESSION</p><h2>{session.alias}</h2><p>{session.lang} · {session.kind} · <RiskBadge risk={session.risk} /></p></div></div><div className="session-safety"><ShieldCheck /><span>Private by default. No names, photos, or phone numbers.</span></div><div className="chat-area"><div className="chat-time">Today, 9:14 PM</div><div className="bubble bubble-them">Hi. I don't really know where to start.</div><div className="bubble bubble-me">That&apos;s okay. We can take it one small step at a time. I&apos;m here to listen.</div><div className="bubble bubble-them">I&apos;ve been carrying a lot this week.</div>{ended && <div className="ended-note"><Check /> Session ended. Add a private note below.</div>}</div>{ended ? <div className="wrap-area"><label htmlFor="private-note">Private end-note <span>Only visible to you</span></label><textarea id="private-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="What would be useful to remember?" /><div className="wrap-actions"><Button variant="outline" onClick={() => setSession(null)}>Close case</Button><Button onClick={() => setSession(null)}>Save & close</Button></div></div> : <div className="composer"><button aria-label="Voice message"><Phone /></button><input placeholder="Write a gentle reply..." /><button className="send-button" aria-label="Send"><ChevronRight /></button></div>}<div className="session-footer"><span><ShieldCheck /> Listener, not doctor</span>{!ended && <Button variant="outline" onClick={endSession}>End session</Button>}</div></div></div>}
    </main>
  )
}

export default ListenerDesk
