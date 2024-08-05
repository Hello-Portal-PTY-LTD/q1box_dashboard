const MENU_HEADER = [
  {
    title: 'PAGES',
  },
  {
    title: 'OTHERS',
  },
]

const MENU_ITEMS = [
  {
    title: 'Analytics',
    src: '/assets/svgs/analytics.svg',
    destination: '/analytics',
    type: 'PAGES',
  },
  {
    title: 'Create QR Code',
    src: '/assets/svgs/create_qr.svg',
    destination: '/create-qr ',
    type: 'PAGES',
  },
  {
    title: 'QR Codes',
    src: '/assets/svgs/qr.svg',
    destination: '/qrcodes',
    type: 'PAGES',
  },
  {
    title: 'Team Collaboration',
    src: '/assets/svgs/team.svg',
    destination: '/team',
    type: 'PAGES',
  },
  {
    title: 'Billing and Plans',
    src: '/assets/svgs/billing.svg',
    destination: '/billing',
    type: 'PAGES',
  },
  {
    title: 'Recycle Bin',
    src: '/assets/svgs/recycle.svg',
    destination: '/recycle',
    type: 'PAGES',
  },
  {
    title: 'White label domain',
    destination: '/whitelabel',
    type: 'OTHERS',
  },
]
const QR_FOLDERS = [
  {
    Name: 'Folder Name 1',
    createdDate: new Date(),
  },
  {
    Name: 'Folder Name 2',
    createdDate: new Date(),
  },
  {
    Name: 'Folder Name 3',
    createdDate: new Date(),
  },
  {
    Name: 'Folder Name 4',
    createdDate: new Date(),
  },
]
const QR_PRICING = [
  {
    Type: 'Feature',
    header: true,
  },
  {
    Type: 'Starter',
    price: '8',
    dynamic: '5',
    scans: 'unlimited',
    users: 1,
    analytics: 'Basic',
    bulk: false,
    maxResolution: '1024 x 1024',
    QRShapes: false,
    whiteLabeling: false,
    yearly_price: '96',
  },
  {
    Type: 'Lite',
    price: '24',
    dynamic: '50',
    scans: 'unlimited',
    users: 1,
    analytics: 'Basic',
    bulk: false,
    maxResolution: '2048 x 2048',
    QRShapes: true,
    whiteLabeling: false,
    yearly_price: '288', // $288
  },
  {
    popular: true,
    Type: 'Business',
    price: '49',
    dynamic: '250',
    scans: 'unlimited',
    users: 2,
    analytics: 'Advanced',
    bulk: true,
    maxResolution: '4096 x 4096',
    QRShapes: true,
    whiteLabeling: false,
    yearly_price: '588', // $588
  },
  {
    Type: 'Professional',
    price: '69',
    dynamic: '500',
    scans: 'unlimited',
    users: 5,
    analytics: 'Advanced',
    bulk: true,
    maxResolution: '4096 x 4096',
    QRShapes: true,
    whiteLabeling: false,
    yearly_price: '828', // $1,188
  },
  {
    Type: 'Enterprise',
    price: '0',
    analytics: 'Advanced',
    bulk: true,
    maxResolution: '4096 x 4096',
    QRShapes: true,
    whiteLabeling: true,
    yearly_price: 0, // Free
  },
]

const LIST_DATA = [
  {
    label: 'Option 1',
    value: '12344',
  },
  {
    label: 'Option 2',
    value: '12344',
  },
  {
    label: 'Option 3',
    value: '12344',
  },
]

const QR_CODE = [
  {
    value: 'Create QR',
    label: 'Create QR Code',
  },
  {
    value: 'Bulk Create',
    label: 'Bulk Create',
  },
]
const QR_STATUS = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Blocked',
    value: 'Blocked',
  },
]
const QR_TYPE = [
  {
    label: 'URL',
    value: 'Url',
  },
  {
    label: 'Advanced Links',
    value: 'AdvanceLinks',
  },
  {
    label: 'Business Card',
    value: 'BusinessCard',
  },
  {
    label: 'Landing Page',
    value: 'LandingPage',
  },
  {
    label: 'Review Collector',
    value: 'ReviewCollector',
  },
  {
    label: 'Calendar',
    value: 'Calendar',
  },
  {
    label: 'Form',
    value: 'Form',
  },
  {
    label: 'Coupon',
    value: 'Coupon',
  },
  {
    label: 'Menu',
    value: 'Menu',
  },
  {
    label: 'Social',
    value: 'Social',
  },
  {
    label: 'Location',
    value: 'Location',
  },
  {
    label: 'Video',
    value: 'Video',
  },
  {
    label: 'App Download',
    value: 'AppDownload',
  },
  {
    label: 'Send SMS',
    value: 'Sms',
  },
  {
    label: 'Make a Call',
    value: 'MakeCall',
  },
  {
    label: 'Send Email',
    value: 'SendEmail',
  },
  {
    label: 'Download PDF',
    value: 'DownloadPdf',
  },
  {
    label: 'Upload Image',
    value: 'UploadImage',
  },
]

const QR_SORT = [
  {
    label: 'Recent',
    value: 'Recent',
  },
  {
    label: 'Name',
    value: 'Name',
  },
  {
    label: 'Date',
    value: 'Date',
  },
  {
    label: 'More Scans',
    value: 'MoreScans',
  },
  {
    label: 'Less Scans',
    value: 'LessScans',
  },
]

// const QR_CARD_DATE = []
const QR_CARD_DATE = [
  {
    id: 1,
    title: 'QR Type Name',
    created: 'Mar 20, 2023',
    folder: 'Folder Name',
    scans: '10',
    site: 'https://www.google.com',
    modified: 'Mar 20, 2023',
  },
  {
    id: 2,
    title: 'QR Type Name',
    created: 'Mar 20, 2023',
    folder: 'Folder Name',
    scans: '10',
    site: 'https://www.google.com',
    modified: 'Mar 20, 2023',
  },
  {
    id: 3,
    title: 'QR Type Name',
    created: 'Mar 20, 2023',
    folder: 'Folder Name',
    scans: '10',
    site: 'https://www.google.com',
    modified: 'Mar 20, 2023',
  },
  {
    id: 4,
    title: 'QR Type Name',
    created: 'Mar 20, 2023',
    folder: 'Folder Name',
    scans: '10',
    site: 'https://www.google.com',
    modified: 'Mar 20, 2023',
  },
]
const TEAM_COLLAB = [
  {
    id: 1,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: true,
  },
  {
    id: 2,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 3,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 4,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 5,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 6,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 7,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 9,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 10,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 11,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 12,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 13,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 14,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 15,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 16,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
  {
    id: 17,
    fullname: 'Full Name',
    email: 'abc@gmail.com',
    invitedby: 'John',
    permission: 'Full Access',
    action: 'Active',
    status: 'Active',
    joiningdate: new Date(),
    active: false,
  },
]
const ANALYTICS_DEVICE = [
  {data: 30, label: 'MAC'},
  {data: 10, label: 'IOS'},
  {data: 20, label: 'WINDOWS'},
  {data: 30, label: 'ANDROID'},
]
const ANALYTICS_BROWSER = [
  {data: 40, label: 'Chrome'},
  {data: 0, label: 'Edge'},
  {data: 30, label: 'Safari'},
  {data: 10, label: 'Firefox'},
]
const ANALYTICS_LOCATION = [
  {data: 30, label: 'Brisbane'},
  {data: 0, label: 'Sydney'},
  {data: 0, label: 'Melbourne'},
  {data: 10, label: 'Adelaide'},
]

const ANALYSIS_WEEKLY = [
  {data: 40, label: 'Mon'},
  {data: 900, label: 'Tue'},
  {data: 1040, label: 'Wed'},
  {data: 430, label: 'Thu'},
  {data: 860, label: 'Fri'},
  {data: 860, label: 'Sat'},
  {data: 40, label: 'Sun'},
]
const ANALYSIS_MONTHLY = [
  {data: 40, label: 'Jan'},
  {data: 900, label: 'Feb'},
  {data: 1040, label: 'Mar'},
  {data: 430, label: 'Apr'},
  {data: 860, label: 'May'},
  {data: 860, label: 'Jun'},
  {data: 40, label: 'Jul'},
]
const ANALYSIS_YEARLY = [
  {data: 40, label: '2017'},
  {data: 900, label: '2018'},
  {data: 1040, label: '2019'},
  {data: 430, label: '2020'},
  {data: 860, label: '2021'},
  {data: 860, label: '2022'},
  {data: 40, label: '2023'},
]
const ANALYSIS_TIME = [
  {data: 40, label: '12:00 AM'},
  {data: 680, label: '12:00 AM'},
  {data: 800, label: '12:00 AM'},
  {data: 360, label: '12:00 AM'},
  {data: 690, label: '12:00 AM'},
  {data: 690, label: '12:00 AM'},
  {data: 40, label: '12:00 AM'},
]
const ANALYSIS_CITY = [
  {data: 4.5, label: 'Melbourne'},
  {data: 2.5, label: 'Sydney'},
  {data: 3.5, label: 'Brisbane'},
  {data: 1.5, label: 'Adelaide'},
]
const ANALYSIS_TOP_PERFORMING = [
  {data: 4.5, label: 'URL'},
  {data: 2.5, label: 'Business Card'},
  {data: 3.5, label: 'PDF'},
  {data: 1.5, label: 'Form'},
]
const ANALYSIS_BEST_PERFORMING = [
  {data: 4.5, label: 'Email'},
  {data: 4.5, label: 'URL'},
  {data: 3.5, label: 'PDF'},
  {data: 3, label: 'Landing Page'},
  {data: 2.5, label: 'Calender'},
  {data: 2.5, label: 'Menu'},
  {data: 2, label: 'Business Card'},
  {data: 2, label: 'Video'},
  {data: 1.5, label: 'Form'},
  {data: 1, label: 'Location'},
]
const PERMISSION_LEVEL = [
  {
    name: 'Acting Admin',
    value: 'actingAdmin',
  },
  {
    name: 'Editor',
    value: 'editor',
  },
  {
    name: 'Viewer',
    value: 'viewer',
  },
  // {
  //   name: 'White Label',
  //   value: 'whiteLabel',
  // },
]

const SUPER_USER_ROLES = Object.freeze({
  SUPER_ADMIN: 'superAdmin',
  ACTING_SUPER_ADMIN: 'actingSuperAdmin',
  SUPER_EDITOR: 'superEditor',
  SUPER_VIEWER: 'superViewer',
})

const IS_SUPER_OR_SUPER_ACTING_ADMIN = (role: any) => {
  if (role === SUPER_USER_ROLES.SUPER_ADMIN || role === SUPER_USER_ROLES.ACTING_SUPER_ADMIN) {
    return true
  }
  return false
}
const ADMIN_PERMISSION_LEVEL = [
  {
    name: 'Super Admin (Acting)',
    value: 'actingSuperAdmin',
  },
  {
    name: 'Super Editor',
    value: 'superEditor',
  },
  {
    name: 'Super Viewer',
    value: 'superViewer',
  },

  // {
  //   name: 'White Label',
  //   value: 'whiteLabel',
  // },
]
const QR_OPTIONS = [
  {
    image: '/media/svg/qr_dashboard/delete.svg',
    label: 'Delete',
  },
  {
    image: '/media/svg/qr_dashboard/prohibit.svg',
    label: 'Block',
  },
  {
    image: '/media/svg/qr_dashboard/arrowright.svg',
    label: 'Send to Folder',
  },
  {
    image: '/media/svg/qr_dashboard/duplicate.svg',
    label: 'Duplicate',
  },
  {
    image: '/media/svg/qr_dashboard/addlabel.svg',
    label: 'Add Label',
  },
  {
    image: '/media/svg/qr_dashboard/save.svg',
    label: 'Save as Template',
  },
]
const ANALYSIS_DURATION = [
  {
    value: 'week',
    label: 'This Week',
  },
  {
    value: 'month',
    label: 'This Month',
  },
  {
    value: 'year',
    label: 'This Year',
  },
]

const QR_HAVE_PREVIEW = [
  'AdvanceLinks',
  'Video',
  'Social',
  'Coupon',
  'Menu',
  'DownloadPdf',
  'BusinessCard',
  'UploadImage',
]

function getCurrentDateRange(forType: string) {
  const validForTypes = ['week', 'month', 'year']
  if (!validForTypes.includes(forType)) {
    throw new Error("Invalid 'for' argument. Please provide 'week', 'month', or 'year'.")
  }

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() // 0-based index, 0 = January
  const currentDay = today.getDate()
  let startDate, endDate

  if (forType === 'week') {
    const firstDayOfWeek = new Date(today)
    firstDayOfWeek.setDate(currentDay - today.getDay()) // Calculate the first day of the week (Sunday)

    startDate = new Date(firstDayOfWeek)
    endDate = new Date(firstDayOfWeek)
    endDate.setDate(firstDayOfWeek.getDate() + 6) // Calculate the last day of the week (Saturday)
  } else if (forType === 'month') {
    startDate = new Date(currentYear, currentMonth, 1) // First day of the current month
    endDate = new Date(currentYear, currentMonth + 1, 0) // Last day of the current month
  } else if (forType === 'year') {
    startDate = new Date(currentYear, 0, 1) // January 1st of the current year
    endDate = new Date(currentYear, 11, 31) // December 31st of the current year
  }

  const startDateString = startDate?.toLocaleString('en-US', {month: 'short', day: '2-digit'})
  const endDateString = endDate?.toLocaleString('en-US', {month: 'short', day: '2-digit'})

  return `${startDateString} - ${endDateString}`
}

const PLANS = [
  {label: 'Free', value: 'FREE'},
  {label: 'Lite', value: 'LITE'},
  {label: 'Business', value: 'BUSINESS'},
  {label: 'Starter', value: 'STARTER'},
  {label: 'Enterprise', value: 'ENTERPRISE'},
  {label: 'Professional', value: 'PROFESSIONAL'},
]

const INDUSTRIES_LIST = [
  'Retail and E-commerce',
  'Hospitality and Tourism',
  'Healthcare',
  'Food and Beverage',
  'Transportation and Logistics',
  'Advertising and Marketing',
  'Education',
  'Real Estate',
  'Automotive',
  'Entertainment',
  'Financial Services',
  'Manufacturing',
  'Energy and Utilities',
  'Fashion and Apparel',
  'Gaming',
  'Sports and Fitness',
  'Events and Conferences',
  'Travel and Airlines',
  'Art and Culture',
  'Government and Public Services',
]

const SUPER_ROLES = ['superAdmin', 'actingSuperAdmin', 'superEditor', 'superViewer']
const PLAIN_ADMIN_ROLES = ['admin', 'actingAdmin', 'editor', 'viewer']
const SHOW_ALL_FOLDERS = "Show All"

export {
  MENU_ITEMS,
  QR_CODE,
  QR_STATUS,
  QR_TYPE,
  QR_SORT,
  LIST_DATA,
  QR_CARD_DATE,
  QR_PRICING,
  INDUSTRIES_LIST,
  MENU_HEADER,
  QR_FOLDERS,
  TEAM_COLLAB,
  ANALYSIS_DURATION,
  ANALYTICS_DEVICE,
  ANALYTICS_BROWSER,
  ANALYTICS_LOCATION,
  ANALYSIS_WEEKLY,
  ANALYSIS_MONTHLY,
  ANALYSIS_YEARLY,
  ANALYSIS_TIME,
  ANALYSIS_CITY,
  ANALYSIS_TOP_PERFORMING,
  ANALYSIS_BEST_PERFORMING,
  PERMISSION_LEVEL,
  QR_OPTIONS,
  ADMIN_PERMISSION_LEVEL,
  SUPER_ROLES,
  getCurrentDateRange,
  PLANS,
  IS_SUPER_OR_SUPER_ACTING_ADMIN,
  PLAIN_ADMIN_ROLES,
  QR_HAVE_PREVIEW,
  SHOW_ALL_FOLDERS
}
