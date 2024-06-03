import React from 'react'

function NextBill({amount, date}) {
  return (
    <div className='t-bg-[white] t-w-full t-max-h-[235px]  t-flex t-flex-col t-p-5 t-rounded-md'>
      <h1 className='t-font-bold t-text-2xl  t-mb-5'>Next Bill</h1>
      <div className='t-bg-[#BEDBFE] t-rounded-md'>
        <div className='t-flex t-flex-col t-text-center p-5 t-gap-2'>
          <h4 className='t-font-bold t-text-xl'>{amount || 0}$</h4>
          <p>{date || 'No upcoming payments'}</p>
        </div>
      </div>
    </div>
  )
}

export default NextBill
