import type { Speciality, SpecialityTheme } from '../types'

// Speciality definitions and theme configuration
// System is agnostic until speciality is provided

export const SPECIALITY_THEMES: Record<Exclude<Speciality, null>, SpecialityTheme> = {
  medicine: {
    primary: '#ef4444',
    secondary: '#fee2e2',
    accent: '#991b1b',
    gradient: { from: 'from-red-50', to: 'to-rose-50' },
    icon: '🏥',
    label: 'Medicine',
    description: 'General Medical Practice',
  },
  dental: {
    primary: '#0ea5e9',
    secondary: '#e0f2fe',
    accent: '#164e63',
    gradient: { from: 'from-sky-50', to: 'to-cyan-50' },
    icon: '🦷',
    label: 'Dental',
    description: 'Dental Care & Surgery',
  },
  orthopaedic: {
    primary: '#f59e0b',
    secondary: '#fef3c7',
    accent: '#92400e',
    gradient: { from: 'from-amber-50', to: 'to-yellow-50' },
    icon: '🦴',
    label: 'Orthopaedic',
    description: 'Bone & Joint Specialist',
  },
  gynaecology: {
    primary: '#ec4899',
    secondary: '#fce7f3',
    accent: '#831843',
    gradient: { from: 'from-pink-50', to: 'to-rose-50' },
    icon: '👩‍⚕️',
    label: 'Gynaecology',
    description: "Women's Health Specialist",
  },
  cardiology: {
    primary: '#e11d48',
    secondary: '#ffe4e6',
    accent: '#600312',
    gradient: { from: 'from-rose-50', to: 'to-red-50' },
    icon: '❤️',
    label: 'Cardiology',
    description: 'Heart & Cardiovascular Specialist',
  },
  ent: {
    primary: '#6366f1',
    secondary: '#e0e7ff',
    accent: '#312e81',
    gradient: { from: 'from-indigo-50', to: 'to-purple-50' },
    icon: '👂',
    label: 'ENT',
    description: 'Ear, Nose & Throat Specialist',
  },
  ophthalmology: {
    primary: '#06b6d4',
    secondary: '#cffafe',
    accent: '#164e63',
    gradient: { from: 'from-cyan-50', to: 'to-blue-50' },
    icon: '👁️',
    label: 'Ophthalmology',
    description: 'Eye Care Specialist',
  },
  surgery: {
    primary: '#7c3aed',
    secondary: '#f3e8ff',
    accent: '#4c1d95',
    gradient: { from: 'from-violet-50', to: 'to-purple-50' },
    icon: '🔪',
    label: 'Surgery',
    description: 'Surgical Specialist',
  },
  other: {
    primary: '#6b7280',
    secondary: '#f3f4f6',
    accent: '#374151',
    gradient: { from: 'from-gray-50', to: 'to-slate-50' },
    icon: '⚕️',
    label: 'Other',
    description: 'Medical Professional',
  },
}

export function getSpecialityTheme(speciality: Speciality): SpecialityTheme | null {
  if (!speciality) return null
  return SPECIALITY_THEMES[speciality]
}

// Neutral/agnostic theme when no speciality is selected
export const NEUTRAL_THEME: SpecialityTheme = {
  primary: '#4f46e5',
  secondary: '#eef2ff',
  accent: '#312e81',
  gradient: { from: 'from-indigo-50', to: 'to-blue-50' },
  icon: '⚕️',
  label: 'Professional Profile',
  description: 'Medical Professional',
}
