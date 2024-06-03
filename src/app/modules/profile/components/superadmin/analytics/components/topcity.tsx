import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'

interface QrsPerFunctionProps {
  data: any
}

const TopCityOfAdminsn: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [cities, setCities] = useState<string[]>([])
  const [count, setCount] = useState<number[]>([])

  useEffect(() => {
    // Extract data when the component mounts or when the 'data' prop changes
    if (data.length > 0) {
      const cities = data?.map((item: any) =>
        item?.city?.length === 0 ? '(Not set by user)' : item?.city
      )
      const count = data?.map((item: any) => item.count)
      setCities(cities)
      setCount(count)
    }
  }, [data])
  const info = {
    labels: cities,
    datasets: [
      {
        label: 'Total Admins',
        data: count,
        backgroundColor: 'pink',
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

export default TopCityOfAdminsn
