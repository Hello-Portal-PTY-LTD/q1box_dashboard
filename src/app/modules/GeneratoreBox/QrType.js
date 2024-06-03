import React from 'react'
import {
  AdvanceLinks,
  LandingPage,
  Url,
  ReviewCollector,
  Calendar,
  Social,
  Menu,
  AppDownload,
  Location,
  Sms,
  MakeCall,
  SendEmail,
  ShowText,
  UploadImage,
  DownloadPdf,
  Video,
  Coupan,
  Forms,
  BusinessCard,
  BulkUpload,
} from './QrTypes'

import {TAB_BAR} from './utils/mock'

const COMPONENT_MAP = {
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

function ConditionalQrComponent({condition}) {
  const key = TAB_BAR.find((item) => item.key === condition)?.key
  const ComponentToRender = COMPONENT_MAP[key]
  return ComponentToRender ? <ComponentToRender /> : null
}

export {ConditionalQrComponent}
