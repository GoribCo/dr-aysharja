import type { DoctorNameParts } from '../types'

export function getSalutation(name: DoctorNameParts): string {
  return name.salutation.trim()
}

export function formatDoctorName(name: DoctorNameParts, includeSalutation = true): string {
  return [includeSalutation ? getSalutation(name) : '', name.firstName, name.middleName, name.lastName]
    .map(part => part.trim()).filter(Boolean).join(' ')
}

export function formatDoctorShortName(name: DoctorNameParts, includeSalutation = true): string {
  return [includeSalutation ? getSalutation(name) : '', name.firstName.trim() || name.lastName.trim() || name.middleName.trim()]
    .filter(Boolean).join(' ')
}

export function createDoctorNameVariables(name: DoctorNameParts): Record<string, string> {
  return {
    ...name,
    doctorName: formatDoctorName(name),
    doctorFullName: formatDoctorName(name),
    doctorShortName: formatDoctorShortName(name),
    doctorSalutation: getSalutation(name),
  }
}

