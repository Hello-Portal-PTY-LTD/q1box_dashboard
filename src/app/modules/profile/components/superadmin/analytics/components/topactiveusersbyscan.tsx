import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'

interface QrsPerFunctionProps {
  data: any
}

const TopActiveUsersByScan: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [user, setUser] = useState<string[]>([])
  const [count, setCount] = useState<number[]>([])

  useEffect(() => {
    // Extract data when the component mounts or when the 'data' prop changes
    if (data.length > 0) {
      // _id is name basically ~(- -)~
      const user = data?.map((item: any) => item?._id)
      const count = data?.map((item: any) => item.scanCount)
      setUser(user)
      setCount(count)
    }
  }, [data])
  const info = {
    labels: user,
    datasets: [
      {
        label: 'Total Scans',
        data: count,
        backgroundColor: 'blue',
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

export default TopActiveUsersByScan
