import {useGetAnalyticsQuery, useGetLocationViseAnalyticsQuery} from 'app/api/api'
import useUserInfo from 'hooks/userUserInfo'
import React from 'react'
import {Bar} from 'react-chartjs-2'
import {useSelector} from 'react-redux'
import {RootState} from 'store'

interface DataItem {
  data: number
  label: string
}

interface Props {
  type: string
  barColor: string
  title: string
}

interface locationStats {
  _id: string
  count: number
}
const HorizontalBarChart: React.FC<Props> = ({type, barColor, title}) => {
  const storedUserInfo = localStorage.getItem('userInfo')
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {}

  const timePeriod = useSelector((state: RootState) => state.config.analytics.timePeriod)
  const {data, error, isLoading} = useGetAnalyticsQuery({
    userId: userInfo?.userId,
    groupBy: type,
    timePeriod,
  })

  if (!data) return <></>

  const labels = data.map((item: locationStats) => item._id?.toUpperCase())
  const values = data.map((item: locationStats) => item.count)
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: barColor,
      },
    ],
  }

  const chartOptions = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return <Bar data={chartData} options={chartOptions} />
}

export {HorizontalBarChart}
