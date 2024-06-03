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

const QrsPerFunction: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [qrNames, setQrNames] = useState<string[]>([])
  const [qrCounts, setQrCounts] = useState<number[]>([])

  useEffect(() => {
    // Extract data when the component mounts or when the 'data' prop changes
    if (data.length > 0) {
      const extractedQrNames = data?.map((item: any) => actions[item.QRName])
      const extractedQrCounts = data?.map((item: any) => item.QRCounts)
      setQrNames(extractedQrNames)
      setQrCounts(extractedQrCounts)
    }
  }, [data])

  const qrScansData = {
    labels: qrNames,
    datasets: [
      {
        label: 'Total QR',
        data: qrCounts,
        backgroundColor: 'red',
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 10,
      },
    },
  }

  return <Bar data={qrScansData} options={chartOptions} />
}

export default QrsPerFunction
