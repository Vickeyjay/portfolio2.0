import { useState } from 'react'
import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'
import {
  FaCode,
  FaGithub,
  FaCloudUploadAlt,
  FaPaperPlane,
  FaComments,
  FaLightbulb,
  FaClock,
  FaUsers,
  FaChrome,
  FaWindows,
  FaPython,
  FaMicrochip,
} from 'react-icons/fa'
import './Skills.css'
import ParticleBackground from './ParticleBackground'

// A union of string literals -- TabId can ONLY ever be one of these three
// exact strings, never any other string. This is called a discriminated
// union. Try assigning activeTab = 'design' anywhere and TypeScript stops
// you immediately, the same way it would if you tried assigning a number
// to a variable typed as string.
type TabId = 'technical' | 'tools' | 'soft'

interface TechnicalSkill {
  name: string
  percent: number
}

interface IconCard {
  icon: IconType // the TYPE of a react-icons component, not a rendered instance
  title: string
  description: string
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'technical', label: 'Technical' },
  { id: 'tools', label: 'Tools' },
  { id: 'soft', label: 'Soft Skills' },
]

const TECHNICAL_SKILLS: TechnicalSkill[] = [
  { name: 'React.js', percent: 90 },
  { name: 'JavaScript', percent: 85 },
  { name: 'Node.js', percent: 80 },
  { name: 'Tailwind CSS', percent: 85 },
  { name: 'Agentic Web Development', percent: 70 },
  { name: 'Embedded Systems', percent: 75 },
  { name: 'Database / SQL', percent: 55 },
  { name: 'Python', percent: 60 },
  { name: 'C#', percent: 40 },
  { name: 'Git', percent: 80 },
]

const TOOLS: IconCard[] = [
  { icon: FaCode, title: 'VS Code', description: 'My daily editor for writing and debugging code.' },
  { icon: FaGithub, title: 'GitHub', description: 'Version control and hosting for every project I ship.' },
  { icon: FaCloudUploadAlt, title: 'Vercel', description: 'Fast, zero-config deployment for React apps.' },
  { icon: FaPaperPlane, title: 'Postman', description: 'Testing and debugging REST APIs during development.' },
  { icon: FaChrome, title: 'Chrome DevTools', description: 'Inspecting, debugging, and profiling everything in the browser.' },
  { icon: FaWindows, title: 'Visual Studio', description: 'For C# development and debugging.' },
  { icon: FaPython, title: 'PyCharm / Jupyter', description: 'Writing and testing Python code and notebooks.' },
  { icon: FaMicrochip, title: 'Tinkercad', description: 'Simulating and prototyping embedded systems circuits.' },

]

const SOFT_SKILLS: IconCard[] = [
  { icon: FaComments, title: 'Communication', description: 'Explaining technical decisions clearly to clients and teammates.' },
  { icon: FaLightbulb, title: 'Problem Solving', description: 'Breaking complex issues into small, workable steps.' },
  { icon: FaClock, title: 'Time Management', description: 'Balancing coursework, freelance work, and personal projects.' },
  { icon: FaUsers, title: 'Team Collaboration', description: 'Working well within a team toward a shared goal.' },
]

function SkillBar({ skill }: { skill: TechnicalSkill }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-label">
        <span>{skill.name}</span>
        <span>{skill.percent}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${skill.percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function IconCardGrid({ items }: { items: IconCard[] }) {
  return (
    <div className="icon-card-grid">
      {items.map((item) => (
        <div className="icon-card" key={item.title}>
          <div className="icon-card-icon">
            <item.icon />
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<TabId>('technical')

  return (
    <section id="skills" className="skills">
      <ParticleBackground />
      <p className="section-kicker">02 — Skills</p>
      <h2 className="skills-heading">My Tech <span className="built">Arsenal</span></h2>

      <div className="skills-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`skills-tab ${activeTab === tab.id ? 'skills-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Only the active tab's content is ever mounted. That's the whole
          animation trick below: when you switch away from Technical and
          back, React tears the bars down and builds them fresh, which is
          why the width animation replays every time you reopen the tab --
          nothing extra needed to "reset" it. */}
      <motion.div
        key={activeTab}
        className="skills-panel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {activeTab === 'technical' && (
          <div className="skill-bars">
            {TECHNICAL_SKILLS.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        )}

        {activeTab === 'tools' && <IconCardGrid items={TOOLS} />}
        {activeTab === 'soft' && <IconCardGrid items={SOFT_SKILLS} />}
      </motion.div>
    </section>
  )
}