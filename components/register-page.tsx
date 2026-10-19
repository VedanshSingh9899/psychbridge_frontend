'use client'

import { ArrowLeft, ArrowRight, Check, Crosshair, FileCheck2, LockKeyhole, MapPin, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type RegistrationData = {
  firstName: string
  lastName: string
  age: string
  gender: string
  state: string
  location: string
  email: string
  phone: string
  otp: string
  profession: string
  otherProfession: string
  qualification: string
  experience: string
  languages: string
  pan: string
  aadhaar: string
  professionalAddress: string
  residentialAddress: string
}

const initialData: RegistrationData = {
  firstName: '', lastName: '', age: '', gender: '', state: '', location: '', email: '', phone: '',
  otp: '', profession: '', otherProfession: '', qualification: '', experience: '', languages: '',
  pan: '', aadhaar: '', professionalAddress: '', residentialAddress: '',
}

const steps = ['Personal info', 'Verify contact', 'Professional details', 'Documents & address']

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)
  const [sameAddress, setSameAddress] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const update = (key: keyof RegistrationData, value: string) => setData((current) => ({ ...current, [key]: value }))

  function next(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < steps.length - 1) setStep((current) => current + 1)
    else setSubmitted(true)
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(({ coords }) => update('location', `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`))
  }

  return (
    <main className="auth-shell registration-shell">
      <section className="auth-visual">
        <Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>A calmer way forward</small></div></Link>
        <div className="auth-story">
          <p className="eyebrow">JOIN THE CARE NETWORK</p>
          <h1>Make room for a better kind of care.</h1>
          <p>Build a trusted practice where every handoff feels human and every person feels held.</p>
          <ul className="auth-benefits">
            <li><span><Check /></span><div><strong>Warm referrals, not cold leads</strong><small>Receive context before the first conversation.</small></div></li>
            <li><span><Check /></span><div><strong>Your practice, your boundaries</strong><small>Set your availability, languages and capacity.</small></div></li>
            <li><span><Check /></span><div><strong>Privacy by default</strong><small>Your documents are collected securely.</small></div></li>
          </ul>
        </div>
        <div className="auth-trust"><ShieldCheck /> Built for care professionals who put people first</div>
      </section>

      <section className="auth-panel registration-panel">
        <div className="auth-panel-inner registration-inner">
          <div className="mobile-login-brand"><Link href="/" className="brand-mark"><span>pb</span><div><strong>PB Wellness</strong><small>Private workspace</small></div></Link></div>
          <div className="registration-heading"><div><p className="eyebrow">PROFESSIONAL REGISTRATION</p><h2>{submitted ? 'Application submitted' : 'Create your profile'}</h2></div><span className="step-count">{submitted ? 'Done' : `${step + 1} of ${steps.length}`}</span></div>
          {!submitted && <div className="stepper" aria-label="Registration progress">{steps.map((label, index) => <div className={`stepper-item ${index <= step ? 'stepper-active' : ''}`} key={label}><span>{index < step ? <Check /> : index + 1}</span><small>{label}</small></div>)}</div>}
          {submitted ? <div className="auth-success"><div className="success-icon"><FileCheck2 /></div><h3>We&apos;ve got your details</h3><p>Your profile is ready for our verification team. We&apos;ll contact you on {data.phone || 'your phone'} once the review is complete.</p><Button asChild><Link href="/login">Continue to sign in <ArrowRight data-icon="inline-end" /></Link></Button></div> : <form onSubmit={next} className="registration-form">
            {step === 0 && <StepCard title="Tell us about yourself" description="This helps us personalise your care network profile.">
              <div className="form-grid"><Field label="First name" id="firstName" value={data.firstName} onChange={(value) => update('firstName', value)} placeholder="Aarav" required /><Field label="Last name" id="lastName" value={data.lastName} onChange={(value) => update('lastName', value)} placeholder="Sharma" required /></div>
              <div className="form-grid"><Field label="Age" id="age" type="number" value={data.age} onChange={(value) => update('age', value)} placeholder="28" required /><SelectField label="Gender" id="gender" value={data.gender} onChange={(value) => update('gender', value)} options={['Woman', 'Man', 'Non-binary', 'Prefer not to say']} required /></div>
              <SelectField label="State" id="state" value={data.state} onChange={(value) => update('state', value)} options={['Delhi', 'Haryana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'Other']} required />
              <div><label className="login-label" htmlFor="location">Current location <span className="optional">Optional</span></label><div className="location-input"><MapPin /><input className="login-input" id="location" value={data.location} onChange={(event) => update('location', event.target.value)} placeholder="City or area" /><button type="button" onClick={useCurrentLocation} title="Use current location"><Crosshair /></button></div><small className="field-hint">We only use this to suggest nearby opportunities.</small></div>
              <div className="form-grid"><Field label="Email address" id="email" type="email" value={data.email} onChange={(value) => update('email', value)} placeholder="you@example.com" required /><Field label="Mobile number" id="phone" type="tel" value={data.phone} onChange={(value) => update('phone', value)} placeholder="+91 98765 43210" required /></div>
            </StepCard>}
            {step === 1 && <StepCard title="Verify your contact details" description={`We&apos;ll send a one-time password to ${data.email || 'your email or mobile'}.`}><div className="otp-methods"><span className="otp-method active">Email OTP</span><span className="otp-method">Mobile OTP</span></div><Field label="Enter 6-digit OTP" id="otp" value={data.otp} onChange={(value) => update('otp', value)} placeholder="000000" inputMode="numeric" required /><button type="button" className="text-button">Didn&apos;t receive it? Resend OTP</button><div className="privacy-callout"><ShieldCheck /><span>Your contact details help keep the PB Wellness network safe.</span></div></StepCard>}
            {step === 2 && <StepCard title="Your professional background" description="Help us understand your training and experience."><SelectField label="Type of psychologist" id="profession" value={data.profession} onChange={(value) => update('profession', value)} options={['Clinical psychologist', 'Counselling psychologist', 'School psychologist', 'Industrial / organisational psychologist', 'Psychiatric social worker', 'Other']} required />{data.profession === 'Other' && <Field label="Tell us your specialisation" id="otherProfession" value={data.otherProfession} onChange={(value) => update('otherProfession', value)} placeholder="Your specialisation" required />}<Field label="Highest qualification" id="qualification" value={data.qualification} onChange={(value) => update('qualification', value)} placeholder="e.g. M.Sc. Clinical Psychology" required /><div className="form-grid"><Field label="Years of experience" id="experience" type="number" value={data.experience} onChange={(value) => update('experience', value)} placeholder="3" required /><Field label="Languages you speak" id="languages" value={data.languages} onChange={(value) => update('languages', value)} placeholder="English, Hindi" required /></div><Field label="Professional registration / licence no." id="license" value="" onChange={() => {}} placeholder="If applicable" /></StepCard>}
            {step === 3 && <StepCard title="Documents & addresses" description="These details can be verified later if required. Keep your documents ready."><div className="form-grid"><Field label="PAN number" id="pan" value={data.pan} onChange={(value) => update('pan', value)} placeholder="ABCDE1234F" /><Field label="Aadhaar number" id="aadhaar" value={data.aadhaar} onChange={(value) => update('aadhaar', value)} placeholder="XXXX XXXX XXXX" /></div><p className="field-hint">Document verification may be requested during onboarding. You can also leave these blank for now.</p><Field label="Professional address" id="professionalAddress" value={data.professionalAddress} onChange={(value) => update('professionalAddress', value)} placeholder="Clinic, office or practice address" required /><Field label="Residential address" id="residentialAddress" value={sameAddress ? data.professionalAddress : data.residentialAddress} onChange={(value) => update('residentialAddress', value)} placeholder="Your residential address" required={!sameAddress} disabled={sameAddress} /><label className="consent-row"><input type="checkbox" checked={sameAddress} onChange={(event) => setSameAddress(event.target.checked)} /><span>My residential and professional addresses are the same</span></label></StepCard>}
            <div className="registration-actions">{step > 0 && <Button type="button" variant="outline" onClick={() => setStep((current) => current - 1)}><ArrowLeft data-icon="inline-start" /> Back</Button>}<Button className="login-submit" type="submit">{step === steps.length - 1 ? 'Submit application' : 'Continue'} <ArrowRight data-icon="inline-end" /></Button></div>
          </form>}
          {!submitted && <div className="auth-note"><LockKeyhole /> Your details stay private and are only used for verification and onboarding.</div>}
          {!submitted && <p className="login-subtitle registration-login">Already part of the network? <Link href="/login">Sign in instead</Link>.</p>}
        </div>
      </section>
    </main>
  )
}

function StepCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <div className="step-card"><h3>{title}</h3><p className="step-description">{description}</p><div className="step-fields">{children}</div></div> }
function Field({ label, id, value, onChange, placeholder, type = 'text', required = false, inputMode, disabled = false }: { label: string; id: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean; inputMode?: 'numeric'; disabled?: boolean }) { return <div><label className="login-label" htmlFor={id}>{label}{!required && <span className="optional">Optional</span>}</label><input className="login-input" id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} inputMode={inputMode} disabled={disabled} /></div> }
function SelectField({ label, id, value, onChange, options, required = false }: { label: string; id: string; value: string; onChange: (value: string) => void; options: string[]; required?: boolean }) { return <div><label className="login-label" htmlFor={id}>{label}</label><select className="login-input login-select" id={id} value={value} onChange={(event) => onChange(event.target.value)} required={required}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div> }
