import * as yup from 'yup'
import {
  Url,
  BusinessCard,
  LandingPage,
  MakeCall,
  sendEmailValidation,
  ReviewCollector,
  ShowText,
  Forms,
  AppDownload,
  Social,
  Sms,
  Calendar,
  DownloadPdf,
  UploadImage,
  Coupan,
  Video,
  Menu,
  AdvanceLinks,
  Location,
  BulkUpload,
} from '.'
const VALIDATION_MATCH = {
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
  SendEmail: sendEmailValidation,
  ShowText: ShowText,
  DownloadPdf: DownloadPdf,
  UploadImage: UploadImage,
  Video: Video,
  Coupon: Coupan,
  Forms: Forms,
  BulkUpload: BulkUpload,
}

const defaultValidation = yup
  .object()
  .shape({
    qrFrameButtonText: '',
  })
  .required()

export default sendEmailValidation

export {VALIDATION_MATCH, defaultValidation}
