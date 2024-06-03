import React from 'react'

const CardRound = ({title, text}) => {
  return (
    <>
      <div className='t-border t-border-blue-600 t-flex t-flex-col t-items-center t-gap-4 t-px-3 t-500:px-6 t-rounded-tl-[100px] t-rounded-br-[100px] t-py-12 t-text-center'>
        <h2 className='t-heading t-font-bold'>{title}</h2>
        <p className='t-breif t-font-medium t-text-t1'>{text}</p>
      </div>
    </>
  )
}

export default CardRound
