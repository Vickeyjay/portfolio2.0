import type { IconType } from 'react-icons'
import {
  FaHouse,
  FaUser,
  FaCode,
  FaLaptopCode,
  FaBriefcase,
  FaEnvelope,
} from 'react-icons/fa6'

// Home isn't in navLinks, so it's defined here and added in front of them.
export const HOME_LINK = { label: 'Home', href: '#hero' }

// Keys must match the `href` values in data/navigation.ts.
// If a link has no icon here, it falls back to showing its text label.
export const NAV_ICONS: Record<string, IconType> = {
  '#hero': FaHouse,
  '#about': FaUser,
  '#skills': FaCode,
  '#projects': FaLaptopCode,
  '#services': FaBriefcase,
  '#contact': FaEnvelope,
}
