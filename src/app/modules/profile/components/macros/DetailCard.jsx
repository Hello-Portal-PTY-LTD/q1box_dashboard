import React from 'react'

function DetailCard({detail, title}) {
  return (
    <div>
      <div className='t-bg-[white] t-rounded-md t-w-full  t-gap-3'>
        <div className='t-p-5'>
          <h1 className='t-text-2xl'>{title || 'Payment Details'}</h1>
          <div className='t-bg-[#FFFFFF] t-mt-2'>
            <h2 className='t-text-lg t-border t-p-5'>{detail || 'No detials Available'}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCard
