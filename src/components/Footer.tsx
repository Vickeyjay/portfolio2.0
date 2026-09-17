import { FaLinkedin, FaWhatsapp, FaGithub, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './Footer.css'

const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/Vickeyjay', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/victor-ajayi-a85a73402', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:your-email@example.com', label: 'Email' },
  { icon: FaXTwitter, href: 'https://x.com/vickeycodes', label: 'X' },
  { icon: FaWhatsapp, href: 'https://wa.me/2349020274394', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div>
            <p className="footer-monogram">
              VA<span>.</span>
            </p>
            <p className="footer-tagline">I build modern web applications with React.js.</p>
          </div>

          <div className="footer-socials">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={social.label}
                className="footer-social-icon"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Ajayi Victor
          </p>
          <p className="footer-credential">Computer Engineering @ University of Ilorin</p>
        </div>
      </div>

      <p className="footer-bg-text" aria-hidden="true">
        VICKEY
      </p>
    </footer>
  )
}