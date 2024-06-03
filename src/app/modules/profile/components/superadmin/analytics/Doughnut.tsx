import React, {useRef, useEffect} from 'react'
import Chart, {ChartConfiguration, ChartTypeRegistry} from 'chart.js/auto'
import {useGetAnalyticsQuery} from 'app/api/api'
import {useSelector} from 'react-redux'
import useUserInfo from 'hooks/userUserInfo'
import {RootState} from 'store'

// Custom type extending HTMLCanvasElement to include the 'chart' property
type ChartCanvasElement = HTMLCanvasElement & {
  chart?: Chart<keyof ChartTypeRegistry, unknown[], unknown>
}

interface DoughnutChartProps {
  type: string
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({type}) => {
  const chartContainer = useRef<ChartCanvasElement>(null)

  const storedUserInfo = localStorage.getItem('userInfo')
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {}

  const timePeriod = useSelector((state: RootState) => state.config.analytics.timePeriod)

  const {data, error, isLoading} = useGetAnalyticsQuery({
    timePeriod: timePeriod,
    userId: userInfo?.userId,
    groupBy: type,
  })

  const createChart = () => {
    const canvas = chartContainer.current

    // Destroy existing chart if it exists
    if (canvas && canvas.chart) {
      canvas.chart.destroy()
    }

    if (!data) return
    // Create new chart
    const chartConfig: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: data.map((d: any) => d.count),
            backgroundColor: ['#FF896B', '#23C967', '#FFC42F', '#3E6BE0'],
          },
        ],
        labels: data.map((d: any) => d._id),
      },
      options: {
        plugins: {
          legend: {
            labels: {},
          },
        },
      },
    }

    // Create the chart instance
    if (canvas) {
      canvas.chart = new Chart(canvas, chartConfig)
    }
  }

  useEffect(() => {
    createChart()

    return () => {
      // Clean up the chart on component unmount
      if (chartContainer?.current?.chart) {
        chartContainer.current.chart.destroy()
      }
    }
  }, [data, chartContainer])

  if (isLoading || error || !data) {
    return null
  }

  return <canvas ref={chartContainer} />
}

export default DoughnutChart
