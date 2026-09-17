import type { IconType } from 'react-icons'
import { FaCode, FaMobileAlt, FaMicrochip, FaTools } from 'react-icons/fa'
import ScrollCue from './ScrollCue'
import './Services.css'

interface Service {
  icon: IconType
  title: string
  description: string
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    icon: FaCode,
    title: 'Web Development',
    description: 'Building fast, responsive websites and web applications from the ground up.',
    bullets: ['React.js / MERN stack builds', 'Landing pages & marketing sites', 'API integration & backend logic'],
  },
  {
    icon: FaMobileAlt,
    title: 'App-Style Platforms',
    description: 'Full-featured, app-like experiences for booking, tracking, and managing things in real time.',
    bullets: ['Dashboards & data-driven UIs', 'Booking / logistics platforms', 'Real-time features & live updates'],
  },
  {
    icon: FaMicrochip,
    title: 'System Architecture',
    description: 'Designing and implementing scalable, efficient systems that meet your business needs.',
    bullets: ['Performance optimization', 'Database design & management', 'Cloud infrastructure setup'],
  },
  {
    icon: FaTools,
    title: 'Maintenance & Support',
    description: 'Keeping existing sites and apps running smoothly, secure, and up to date.',
    bullets: ['Bug fixes & performance tuning', 'Feature additions', 'Ongoing freelance support'],
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <p className="section-kicker">04 — Services</p>
      <h2 className="services-heading">What I Can Do <span className="built">For You</span></h2>

      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <div className="service-card" key={service.title}>
            <span className="service-number">{String(i + 1).padStart(2, '0')}</span>

            <div className="service-icon">
              <service.icon />
            </div>

            <h3>{service.title}</h3>
            <p>{service.description}</p>

            <ul className="service-bullets">
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <span className="service-arrow">→</span>
          </div>
        ))}
      </div>

      <ScrollCue />
    </section>
  )
}