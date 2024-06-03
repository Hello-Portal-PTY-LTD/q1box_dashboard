import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'

interface QrsPerFunctionProps {
  data: any
}

const SubPerPlan: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [planName, setPlanName] = useState<string[]>([])
  const [planCount, setPlanCount] = useState<number[]>([])

  useEffect(() => {
    if (data.length > 0) {
      const extractedPlans = data?.map((item: any) => item.planName)
      const extractedPlanCount = data?.map((item: any) => item.count)
      setPlanName(extractedPlans)
      setPlanCount(extractedPlanCount)
    }
  }, [data])

  const subPlanData = {
    labels: planName,
    datasets: [
      {
        label: 'Total Subscriptions',
        data: planCount,
        backgroundColor: 'cyan',
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
  return <Bar data={subPlanData} options={chartOptions} />
}

export default SubPerPlan
