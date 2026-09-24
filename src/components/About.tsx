import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'
import './About.css'
import ScrollCue from './ScrollCue'
import aboutImg from '../assets/projects/about.png'

const SPEC_SHEET = [
  { label: 'Name', value: 'Ajayi Victor' },
  { label: 'Role', value: 'Full Stack Developer' },
  { label: 'Location', value: 'Ilorin, Nigeria' },
  { label: 'Focus', value: 'MERN Stack / React.js' },
]

const TRAITS = ['Detail-Oriented', 'Fast Learner', 'Team Player', 'Problem Solver']

export default function About() {
  return (
    <section id="about" className="about">
      <p className="section-kicker">01 — About Me</p>

      <div className="about-grid">
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-image-card">
            <span className="about-role-label">Full Stack Developer</span>
            <img
              src={aboutImg}
              alt="Ajayi Victor"
              className="about-image"
            />
          </div>

          <dl className="about-spec-sheet">
            {SPEC_SHEET.map((item) => (
              <div className="spec-row" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2 className="about-heading">
            Turning ideas into
            <br />
            <span className="about-heading-accent"> Real applications</span>
          </h2>

          <p>
            I'm a Full Stack Developer with about three years of hands-on
            experience building for the web, based in Ilorin, Nigeria.
          </p>
          <p>
            My work spans a wide range of domains from fintech and DeFi products
            (EdgeLedger, Verd), to logistics and delivery platforms (Verse, Keke
            Cruise), to healthcare (Zakom Medical Diagnostics) and e-commerce
            (FancyGiftsPlace), as well as IoT-connected systems (Vickorede Water
            System) — all built primarily with <strong>React.js</strong> and
            the <strong>MERN stack</strong>.
          </p>
          <p>
            I currently lead development at Tokora Marketplace and take on
            freelance projects, working closely with clients from first
            concept through to a shipped product.
          </p>

          <p className="about-motto">"Build it once, build it right."</p>

          <div className="about-traits">
            {TRAITS.map((trait) => (
              <span className="trait-chip" key={trait}>
                {trait}
              </span>
            ))}
          </div>

          <div className="about-links">
            <a href="https://github.com/Vickeyjay" target="_blank" rel="noreferrer" className="about-link-btn">
              <FaGithub /> GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/victor-ajayi-a85a73402"
              target="_blank"
              rel="noreferrer"
              className="about-link-btn"
            >
              <FaLinkedin /> LinkedIn
            </a>

              <a href="https://x.com/vickeycodes" target="_blank" rel="noreferrer" className="about-link-btn">
                <FaXTwitter /> Twitter
              </a>
              <a href="https://wa.me/2349020274394" target="_blank" rel="noreferrer" className="about-link-btn">
                <FaWhatsapp /> WhatsApp
              </a>

            <a href="mailto:victor.ajayi939@gmail.com" className="about-link-btn">
              <FaEnvelope /> Email
            </a>
          </div>
        </motion.div>
      </div>

            <ScrollCue />
    </section>
  )
}