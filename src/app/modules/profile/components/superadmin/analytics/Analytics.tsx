/* eslint-disable jsx-a11y/anchor-is-valid */
import {ANALYSIS_DURATION} from 'mock'

import {Dropdown} from '_metronic/partials/qrComponents'
import QrsPerFunction from './components/qrsperfunction'
import SubPerPlan from './components/subsperplan'
import ActiveUserQrQunatity from './components/topactiveuserQrquantity'
import TopQrsPerFunction from './components/topqrscanperfunction'
import TopActiveUsersByScan from './components/topactiveusersbyscan'
import TopCityOfAdminsn from './components/topcity'
import TopIndustryAdmins from './components/topindustryifadmins'
import TopCountryOfAdmins from './components/topcountry'
import {useEffect, useState} from 'react'
import axios from 'axios'

export function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({
    QRCountsByName: [],
    QRUser: [],
    cityCounts: [],
    countryCounts: [],
    industryCounts: [],
    scanQR: [],
    scanUser: [],
    subUserTotalCount: 0,
    subscriptionCounts: [],
    subscriptionTotalCounts: 0,
    userTotalCount: 0,
    adminUsers: 0,
    QRcount: 0,
  })

  interface ChartWrapperProps {
    title: string
    children: React.ReactNode
  }

  interface Props {
    title: string
    children: React.ReactNode
  }

  const [duration, setDuration] = useState('year')

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_QR_API}analytics/admin/analytics?duration=${duration}`
    )
    setAnalyticsData(response.data)
  }
  const handleDropDown = (value: any) => {
    setDuration(value)
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  const CardWrapper = ({title, children}: ChartWrapperProps) => {
    return (
      <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
        <h3 className='t-self-start'>{title}</h3>
        <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
          <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>{children}</h4>
        </div>
      </div>
    )
  }

  const ChartWrapper: React.FC<Props> = ({title, children}) => {
    const titleClass = 't-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'
    return (
      <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
        <h2 className={titleClass}>{title}</h2>
        {children}
      </div>
    )
  }

  return (
    <div>
      <div className='t-text-t2 t-flex t-flex-col t-gap-7'>
        <div className='t-flex t-flex-col t-gap-8'>
          <div className=''>
            <div className='t-flex t-items-center t-justify-between t-flex-wrap t-flex-stack '>
              <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Analytics</h3>

              <div className='t-flex t-items-center t-gap-6 t-my-2 t-w-[150px]'>
                <Dropdown
                  title='This Year'
                  onSelect={handleDropDown}
                  listItems={ANALYSIS_DURATION}
                  primary={true}
                />
              </div>
            </div>

            <div className='t-grid t-grid-cols-1 t-mb-8 500:t-grid-cols-3 t-gap-8 md:t-w-[85%]'>
              <CardWrapper title='Total Users'>{analyticsData?.userTotalCount}</CardWrapper>
              <CardWrapper title={`Total Users (Admins)`}>{analyticsData?.adminUsers}</CardWrapper>
              <CardWrapper title='Total Sub-Users'>{analyticsData?.subUserTotalCount}</CardWrapper>
              <CardWrapper title='Total Subscriptions'>
                {analyticsData.subscriptionTotalCounts}
              </CardWrapper>
              <CardWrapper title='Total QR Count'>{analyticsData?.QRcount}</CardWrapper>
            </div>
          </div>
        </div>
      </div>

      <div className='t-flex t-flex-col t-gap-4'>
        <div className='t-grid t-grid-cols-1 md:t-grid-cols-2 t-gap-8 '>
          <ChartWrapper title='Total QR Scans (Per Function)'>
            <QrsPerFunction data={analyticsData?.QRCountsByName} />
          </ChartWrapper>

          <ChartWrapper title='Subscriptions (Per Plan)'>
            <SubPerPlan data={analyticsData?.subscriptionCounts} />
          </ChartWrapper>

          <ChartWrapper title='Top QR Scans (By-Function)'>
            <TopQrsPerFunction data={analyticsData?.scanQR} />
          </ChartWrapper>

          <ChartWrapper title='Top Active Users (QR-Quantity)'>
            <ActiveUserQrQunatity data={analyticsData?.QRUser} />
          </ChartWrapper>

          <ChartWrapper title='Top Active Users (By-Scan)'>
            <TopActiveUsersByScan data={analyticsData?.scanUser} />
          </ChartWrapper>

          <ChartWrapper title='Top Cities of Admins'>
            <TopCityOfAdminsn data={analyticsData?.cityCounts} />
          </ChartWrapper>

          <ChartWrapper title='Top Countries of Admins'>
            <TopCountryOfAdmins data={analyticsData?.countryCounts} />
          </ChartWrapper>

          <ChartWrapper title='Top Industry of Admins'>
            <TopIndustryAdmins data={analyticsData?.industryCounts} />
          </ChartWrapper>
        </div>
      </div>
    </div>
  )
}
