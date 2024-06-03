import React from 'react'
import ToggleBar from './macros/ToggleBar'

import InputColor from './macros/inputColor'

function QrColor() {
  return (
    <div className='t-flex t-flex-col t-w-full t-gap-10 t-items-center'>
      <img src='/assets/images/qr.png' height={140} width={140} alt='qr' />
      <div className='t-w-full t-px-5 t-py-2 t-bg-light t-border t-border-grey t-rounded-[5px]'>
        <p className='t-font-bold'>Color</p>
        <div className='t-flex t-gap-2'>
          <InputColor name='fgColor' inputLabel='Foreground' defaultColor='#000000' />
          <InputColor name='bgColor' inputLabel='Background' defaultColor='#ffffff' />
        </div>
      </div>
    </div>
  )
}

export default QrColor
