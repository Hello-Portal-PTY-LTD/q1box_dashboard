import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'

interface QrsPerFunctionProps {
  data: any
}

const TopCountryOfAdmins: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [countries, setCountries] = useState<string[]>([])
  const [count, setCount] = useState<number[]>([])

  useEffect(() => {
    // Extract data when the component mounts or when the 'data' prop changes
    if (data.length > 0) {
      const countries = data?.map((item: any) =>
        item?.country?.length === 0 ? '(Not set by user)' : item?.country
      )
      const count = data?.map((item: any) => item.count)
      setCountries(countries)
      setCount(count)
    }
  }, [data])
  const qrscandata = {
    labels: countries,
    datasets: [
      {
        label: 'Total Admins',
        data: count,
        backgroundColor: 'gray',
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
  return <Bar data={qrscandata} options={chartOptions} />
}

export default TopCountryOfAdmins
