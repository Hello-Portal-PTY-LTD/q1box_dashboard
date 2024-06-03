import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'
// const qrscandata = {
//   labels: ['Waqar', 'Ahmed', 'Ali', 'Usman'],
//   datasets: [
//     {
//       label: 'QR Quantity',
//       data: [11, 22, 13, 1],
//       backgroundColor: 'green',
//     },
//   ],
// }
// const chartOptions = {
//   scales: {
//     y: {
//       min: 0,
//       stepSize: 10,
//     },
//   },
// }
interface QrsPerFunctionProps {
  data: any
}

const ActiveUserQrQunatity: React.FC<QrsPerFunctionProps> = ({data}) => {
  const [users, setUsers] = useState<string[]>([])
  const [count, setCount] = useState<number[]>([])

  useEffect(() => {
    // Extract data when the component mounts or when the 'data' prop changes
    if (data.length > 0) {
      const users = data?.map((item: any) => item.QRUser)
      const count = data?.map((item: any) => item.count)
      setUsers(users)
      setCount(count)
    }
  }, [data])

  const info = {
    labels: users,
    datasets: [
      {
        label: 'Total QR',
        data: count,
        backgroundColor: 'yellow',
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

export default ActiveUserQrQunatity
