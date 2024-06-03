import {
  AdvanceLinks,
  AppDownload,
  BusinessCard,
  Calendar,
  Coupan,
  DownloadPdf,
  Forms,
  LandingPage,
  MakeCall,
  ReviewCollector,
  SendEmail,
  ShowText,
  Sms,
  Social,
  Url,
  Video,
  Menu,
  UploadImage,
  Location,
  BulkUpload,
} from './index'

//--- they are default values that are using default arround the app (same fields)
const DEFAULTS = {
  qrStyle: 'circular',
  qrQuality: 'HIGH',
  qrDownloadOption: 'PNG',
  logoSize: 0.5,
  qrName: '',
  qrFolder: '',
}

const DEFAULT_VALUES_MATCH = {
  Url: Url,
  AdvanceLinks: AdvanceLinks,
  BusinessCard: BusinessCard,
  LandingPage: LandingPage,
  ReviewCollector: ReviewCollector,
  Calendar: Calendar,
  Menu: Menu,
  Social: Social,
  AppDownload: AppDownload,
  Location: Location,
  Sms: Sms,
  MakeCall: MakeCall,
  SendEmail: SendEmail,
  ShowText: ShowText,
  DownloadPdf: DownloadPdf,
  UploadImage: UploadImage,
  Video: Video,
  Coupon: Coupan,
  Forms: Forms,
  BulkUpload: BulkUpload,
}

export {DEFAULT_VALUES_MATCH, DEFAULTS}
