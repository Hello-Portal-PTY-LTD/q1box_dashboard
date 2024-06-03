import {useGetTimeBasedAnalyticsQuery} from 'app/api/api'
import useUserInfo from 'hooks/userUserInfo'
import moment from 'moment'
import React from 'react'
import {Bar} from 'react-chartjs-2'
import {useSelector} from 'react-redux'
import {RootState} from 'store'

interface AnalysisData {
  data: number
  label: string
}

interface BarChartProps {
  granularity: string
  barColor: string
  title: string
}

interface TimePeriodData {
  _id: string
  count: number
}

const format = (time: string, granularity: string) => {
  switch (granularity) {
    case 'hour':
      return moment(time, 'YYYY-MM-dd H').format('hh:00 A')
    case 'day':
      return moment(time, 'YYYY-MM-DD').format('ddd')
    case 'month':
      return moment(time, 'YYYY-MM').format('MMM')
    case 'year':
      return moment(time, 'YYYY').format('YYYY')
  }
}

const BarChart: React.FC<BarChartProps> = ({granularity, barColor, title}) => {
  const storedUserInfo = localStorage.getItem('userInfo')
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {}

  const {data, error, isLoading} = useGetTimeBasedAnalyticsQuery({
    timePeriod: granularity,
    userId: userInfo?.userId,
  })

  if (!data) return <></>

  const labels = data.map((item: TimePeriodData) => format(item._id, granularity))
  const values = data.map((item: TimePeriodData) => item.count)

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
    scales: {
      y: {
        min: 0,
        max: Math.max(...values),
        stepSize: 10,
      },
    },
  }

  return <Bar data={chartData} options={chartOptions} />
}

export default BarChart
