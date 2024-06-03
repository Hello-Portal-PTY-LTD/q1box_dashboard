import {LOGOS} from 'app/modules/GeneratoreBox/utils/mock'
import {SUPER_ROLES} from 'mock'
import moment from 'moment'
// const {differenceInDays, parse} = require('date-fns')

function formatDate(date) {
  return moment(date).format('MMMM DD, YYYY')
}
const handleAccess = (role) => {
  if (role === 'actingAdmin') return 'Full Access'
  else if (role === 'editor') return 'Editor Access'
  else if (role === 'viewer') return 'View Access'
  else if (role === 'whiteLabel') return 'White Label'
}

const IsSuperRole = (role) => {
  return SUPER_ROLES.includes(role)
}

const IsSuperViewer = (role) => {
  if (role === 'superViewer') {
    return true
  } else {
    return false
  }
}

const IsSuperEditor = (role) => {
  if (role === 'superEditor') {
    return true
  } else {
    return false
  }
}

function roleFormat(role) {
  const roles = {
    superAdmin: 'Super Admin',
    superEditor: 'Super Editor',
    superViewer: 'Super Viewer',
    actingSuperAdmin: 'Super Admin (acting)',
    admin: 'Admin',
    actingAdmin: 'Acting Admin',
    editor: 'Editor',
    viewer: 'Viewer',
    whiteLabel: 'White Label',
  }
  return roles[role]
}

let usedNumbers = []
export function generateUniqueNumber() {
  while (true) {
    const number = Math.floor(Math.random() * 900) + 100
    if (!usedNumbers.includes(number)) {
      usedNumbers.push(number)

      if (usedNumbers.length > 900) {
        usedNumbers.length = 0
      }

      return number
    }
  }
}

function extractNameFromSrc(array) {
  return array?.map((item) => {
    const srcParts = item?.src.split('/')
    const fileName = srcParts[srcParts?.length - 1] // Get the last part of the src
    const name = fileName?.replace('.svg', '').split('.')[0] // Remove the '.svg' extension and everything after the first dot
    const cleanName = name.replace('.', '') // Remove the dot from the name
    return {...item, name: cleanName}
  })
}

const findObjectByName = (newArrayWithExtractedNames, nameToSearch) => {
  return newArrayWithExtractedNames?.find((item) => item?.name === nameToSearch)
}

const newArrayWithExtractedNames = extractNameFromSrc(LOGOS)

function returnFileSrc(name) {
  const foundSrc = findObjectByName(newArrayWithExtractedNames, name)

  return foundSrc
}

function isValidUrl(str) {
  try {
    const parsedUrl = new URL(str)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch (error) {
    return false
  }
}

function calculateRemainingDays(inputDate) {
  // Split the input date string into day, month, and year components
  const dateParts = inputDate.split('/')
  const day = parseInt(dateParts[0])
  const month = parseInt(dateParts[1]) - 1 // JavaScript months are 0-based
  const year = parseInt(dateParts[2])

  const inputDateObj = new Date(year, month, day)
  const currentDateObj = new Date()

  // Calculate the time difference in milliseconds
  const timeDifference = inputDateObj - currentDateObj

  // Check if the input date is in the past
  if (inputDateObj < currentDateObj) {
    return 0 // Trial has ended
  }

  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return remainingDays
}

const navigationBlocker = (tx, popUpMessage) => {
  if (true) {
    const answer = window.confirm(popUpMessage)
    if (answer) {
      tx.retry() // Retry the navigation
    }
  }
}

function camelize(str) {
  return str
    ?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export {
  formatDate,
  handleAccess,
  roleFormat,
  isValidUrl,
  returnFileSrc,
  IsSuperRole,
  IsSuperViewer,
  IsSuperEditor,
  calculateRemainingDays,
  camelize,
  navigationBlocker,
}
