import React from 'react'
import classNames from 'classnames'

function PlainCard({brief, title}) {
  const cardClass = classNames(
    't-w-full t-lg:max-w-[250px]  t-h-auto t-text-center t-flex-column t-gap-2 t-lg:gap-4 t-rounded-[20px] t-bg-white t-gradient-border-3 t-p-4 t-lg:p-[23px]'
  )

  return (
    <div className={cardClass}>
      <p className='t-text-black t-font-bold t-lg:text-lg'>{title}</p>
      <p className='t-text-sm t-lg:text-base t-text-t1 t-antialiased t-font-[500]'>{brief}</p>
    </div>
  )
}

export default PlainCard
