import React from 'react'

function Card({label, tabKey, handleCurrentQrType, handleTabs, icon}) {
  return (
    <div
      className='t-w-full t-text-1 t-px-2 t-py-3 t-cursor-pointer hover:t-border-primary hover:t-text-primary t-bg-light t-border t-border-grey t-rounded-[5px]'
      onClick={() => {
        handleCurrentQrType(tabKey)
        // handleClose()
        handleTabs(tabKey)
      }}
    >
      <div className='t-flex t-gap-1 md:t-gap-2 t-items-center'>
        {icon}
        <p className='t-text-[10px] lg:t-text-base t-text-center'>{label}</p>
      </div>
    </div>
  )
}

export default Card
