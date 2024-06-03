import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'

interface QrsPerFunctionProps {
  data: any
}

const TopIndustryAdmins: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [industries, setIndustries] = useState<string[]>([])
  const [count, setCount] = useState<number[]>([])

  useEffect(() => {
    // Extract data when the component mounts or when the 'data' prop changes
    if (data.length > 0) {
      const industries = data?.map((item: any) =>
        item?.industry?.length === 0 ? '(Not set by user)' : item?.industry
      )
      const count = data?.map((item: any) => item.count)
      setIndustries(industries)
      setCount(count)
    }
  }, [data])
  const scanData = {
    labels: industries,
    datasets: [
      {
        label: 'Total Admins',
        data: count,
        backgroundColor: 'brown',
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
  return <Bar data={scanData} options={chartOptions} />
}

export default TopIndustryAdmins
