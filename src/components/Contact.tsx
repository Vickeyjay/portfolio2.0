import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { FaEnvelope, FaWhatsapp, FaGithub, FaXTwitter } from 'react-icons/fa6'
import {FaMapMarkerAlt} from 'react-icons/fa'
import ScrollCue from './ScrollCue'
import './Contact.css'
import emailjs from '@emailjs/browser'

interface ContactTile {
  icon: typeof FaEnvelope
  label: string
  value: string
  href: string
}

const TILES: ContactTile[] = [
  { icon: FaEnvelope, label: 'Email', value: 'victor.ajayi939@gmail.com', href: 'mailto:victor.ajayi939@gmail.com' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+234 902 027 4394', href: 'https://wa.me/2349020274394' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Ilorin, Nigeria', href: '#' },
  { icon: FaGithub, label: 'GitHub', value: '@Vickeyjay', href: 'https://github.com/Vickeyjay' },
  { icon: FaXTwitter, label: 'Twitter', value: '@vickeycodes', href: 'https://x.com/vickeycodes' },
]

// The shape of our form's data, in one place. Every field the form
// tracks corresponds to exactly one key here -- this is what lets
// TypeScript catch a typo like formData.emial instantly.
interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM: FormState = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // One handler for every field, instead of four separate ones. Works
  // because every input below has a `name` attribute matching one of
  // FormState's keys -- e.substring target.name tells us WHICH field
  // changed, e.target.value tells us to WHAT.
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setStatus('sending')

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
    )
    .then(() => {
      setStatus('success')
      setFormData(INITIAL_FORM)
    })
    .catch((error) => {
      console.error('EmailJS error:', error)
      setStatus('error')
    })
}

  

 return (
  <section id="contact" className="contact">
    <p className="section-kicker">05 — Contact</p>
    <h2 className="contact-heading">Let's Build Together</h2>
        <span className="contact-status-pill">
          <span className="status-dot" /> Currently open to freelance projects
        </span>
    <div className="contact-grid">
      <div className="contact-info">


        <div className="contact-tiles">
          {TILES.map((tile) => (
            <a
              key={tile.label}
              href={tile.href}
              target={tile.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="contact-tile"
            >
              <tile.icon className="contact-tile-icon" />
              <div>
                <p className="contact-tile-label">{tile.label}</p>
                <p className="contact-tile-value">{tile.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* everything inside the form stays exactly as it was */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name*</label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email*</label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="subject">Subject*</label>
          <input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label htmlFor="message">Message*</label>
          <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {status === 'success' && (
        <p className="form-status form-status-success">
          Message sent — I'll get back to you soon!
        </p>
      )}
      {status === 'error' && (
        <p className="form-status form-status-error">
          Something went wrong. Try again, or email me directly.
        </p>
      )}
    </div>

    <ScrollCue />
  </section>
)
}