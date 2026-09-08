import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import matter from 'gray-matter'
import { loadDoctorContent, loadContentSection, loadDoctorServices } from './loaders'
import { loadDoctorDetails, loadPractice } from './editable'

function fixture(run: (edit: (filename: string, update: (data: any) => void) => void) => void) {
  const original = process.cwd()
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'doctor-editing-'))
  fs.cpSync(path.join(original, 'content'), path.join(dir, 'content'), { recursive: true })
  process.chdir(dir)
  try {
    run((filename, update) => {
      const full = path.join(dir, 'content', filename)
      const parsed = matter(fs.readFileSync(full, 'utf8'))
      const data = structuredClone(parsed.data)
      update(data)
      fs.writeFileSync(full, matter.stringify(parsed.content, data))
    })
  } finally {
    process.chdir(original)
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

test('one practice edit updates Home, Appointment, Contact and shared booking details', () => fixture(edit => {
  edit('doctor/contact.md', data => {
    data.phone = '+8801000000000'
    data.bookingPhone = ''
  })
  edit('doctor/en/chamber.md', data => {
    data.chamber.name = 'Updated Clinic'
    data.chamber.address = 'New address'
    data.chamber.visitingDays = 'Monday'
    data.chamber.visitingHours = '10 AM–2 PM'
  })
  const data = loadDoctorContent('en')
  assert.equal((data.home as any).chamberName, 'Updated Clinic')
  assert.equal((data.home as any).chamberAddress, 'New address')
  assert.equal((data.home as any).consultationDays, 'Monday · 10 AM–2 PM')
  assert.deepEqual(data.appointment?.chambers, data.contact?.chambers)
  assert.equal(data.appointment?.chambers?.[0].name, 'Updated Clinic')
  assert.equal(data.site.appointment?.phone, '+8801000000000')
  assert.equal(data.site.contact?.phone, '+8801000000000')
  assert.equal((loadContentSection('home.md', 'en') as any).chamberName, 'Updated Clinic')
}))

test('one doctor edit updates names, homepage credentials, profile and Qualifications', () => fixture(edit => {
  edit('doctor/en/profile.md', data => {
    data.firstName = 'Updated'
    data.qualifications = ['Degree One', 'Degree Two']
    data.languages = ['Bengali', 'English', 'Hindi']
  })
  const data = loadDoctorContent('en')
  assert.match((data.profile as any).doctorName, /Updated/)
  assert.match((data.home as any).doctorName, /Updated/)
  assert.deepEqual((data.home as any).credentialItems, ['Degree One', 'Degree Two'])
  assert.match(data.qualifications?.content ?? '', /- \*\*Degree One\*\*\n- \*\*Degree Two\*\*/)
  assert.ok((data.profile as any).languages.includes('Hindi'))
  assert.doesNotMatch(JSON.stringify(data), /{{\s*\w+\s*}}/)
}))

test('service title and visibility changes reach Home without a second service list', () => fixture(edit => {
  const serviceFile = fs.readdirSync('content/doctor/en/services').find(file => file.endsWith('.md'))!
  edit(`doctor/en/services/${serviceFile}`, data => { data.title = 'Updated service'; data.order = -1; data.visible = true })
  assert.equal((loadDoctorContent('en').home as any).services[0], 'Updated service')
  edit(`doctor/en/services/${serviceFile}`, data => { data.visible = false })
  const data = loadDoctorContent('en')
  assert.ok(!(data.home as any).services.includes('Updated service'))
  assert.ok(!data.servicesList.some(service => service.title === 'Updated service'))
}))

test('separate booking number, empty chamber and hidden pages are supported', () => fixture(edit => {
  edit('doctor/contact.md', data => {
    data.phone = '+8801000000000'
    data.bookingPhone = '+8801000000001'
  })
  edit('doctor/en/chamber.md', data => {
    for (const key of Object.keys(data.chamber)) data.chamber[key] = ''
  })
  edit('doctor/en/awards.md', data => { data.visible = false })
  const data = loadDoctorContent('en')
  assert.equal(data.site.appointment?.phone, '+8801000000001')
  assert.equal(data.site.contact?.phone, '+8801000000000')
  assert.equal(data.appointment?.chambers, undefined)
  assert.equal(data.awards?.isVisible, false)
}))

test('doctor and practice field errors identify the editable file', () => fixture(edit => {
  edit('doctor/en/profile.md', data => { data.qualifications = 'not a list' })
  assert.throws(() => loadDoctorDetails('en'), /doctor\/en\/profile.md: qualifications/)
  edit('doctor/contact.md', data => { data.phone = 12345 })
  assert.throws(() => loadPractice('en'), /doctor\/contact.md: phone/)
}))

test('feedback records stay separate from page copy and feed both displays', () => fixture(edit => {
  edit('doctor/en/reviews.md', data => {
    data.featuredQuote = 'A selected quotation.'
    data.featuredAuthor = 'Patient A'
    data.reviews = [{ name: 'Patient A', rating: 5, date: 'September 2026', service: 'Consultation', review: 'A selected quotation.', status: 'approved' }]
  })
  const data = loadDoctorContent('en')
  assert.equal((data.home as any).testimonial, 'A selected quotation.')
  assert.equal((data.home as any).testimonialAuthor, 'Patient A')
  assert.equal((data.review as any).reviews.length, 1)
  assert.equal((data.review as any).reviews[0].review, 'A selected quotation.')
}))

test('another speciality and online-only booking are configured entirely through content', () => fixture(edit => {
  edit('settings/site.md', data => {
    data.defaultLanguage = 'en'
    data.speciality = 'cardiology'
    data.branding = { shortName: 'Heart Clinic', monogram: 'HC', icon: '/icon.svg' }
    delete data.websiteInquiry
  })
  edit('doctor/en/profile.md', data => {
    data.firstName = 'Alex'
    data.middleName = ''
    data.lastName = 'Morgan'
    data.designation = 'Cardiology Specialist'
    data.role = 'Cardiology Specialist'
    data.specialization = 'Cardiology'
    data.bio = 'Meet {{doctorName}}.'
    data.affiliation = 'Example Hospital'
  })
  edit('doctor/contact.md', data => {
    data.phone = ''
    data.bookingPhone = ''
    data.bookingUrl = 'https://example.com/appointments'
  })
  const data = loadDoctorContent()
  assert.equal((data.profile as any).doctorName, 'Dr. Alex Morgan')
  assert.equal(data.site.speciality, 'cardiology')
  assert.equal(data.site.defaultLanguage, 'en')
  assert.equal(data.site.branding?.monogram, 'HC')
  assert.equal(data.site.appointment?.url, 'https://example.com/appointments')
  assert.equal(data.site.appointment?.phone, '')
  assert.equal(data.resources.settings, null)
}))
