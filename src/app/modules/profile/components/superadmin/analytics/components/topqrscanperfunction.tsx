import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'
const actions: any = {
  AdvanceLinks: 'Advance Links',
  LandingPage: 'Landing Page',
  Url: 'URL',
  ReviewCollector: 'Review Collector',
  Calendar: 'Calendar',
  Social: 'Social',
  Menu: 'Menu',
  AppDownload: 'App Download',
  Location: 'Location',
  Sms: 'SMS',
  MakeCall: 'Make Call',
  SendEmail: 'Send Email',
  ShowText: 'Show Text',
  UploadImage: 'Upload Image',
  DownloadPdf: 'Download PDF',
  Video: 'Video',
  Coupan: 'Coupon',
  Forms: 'Forms',
  BusinessCard: 'Business Card',
}
interface QrsPerFunctionProps {
  data: any
}

const TopQrsPerFunction: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [qrNames, setQrNames] = useState<string[]>([])
  const [qrCounts, setQrCounts] = useState<number[]>([])

  useEffect(() => {
    // Extract data when the component mounts or when the 'data' prop changes
    if (data.length > 0) {
      const scanQrName = data?.map((item: any) => actions[item.scanQR])
      const extractedQrCounts = data?.map((item: any) => item.count)
      setQrNames(scanQrName)
      setQrCounts(extractedQrCounts)
    }
  }, [data])

  const info = {
    labels: qrNames,
    datasets: [
      {
        label: 'Total Scans',
        data: qrCounts,
        backgroundColor: 'yellow',
      },
    ],
  }
  const chartOptions = {
    scales: {
      y: {
        min: 0,
        stepSize: 10,
      },
    },
  }
  return <Bar data={info} options={chartOptions} />
}

export default TopQrsPerFunction
