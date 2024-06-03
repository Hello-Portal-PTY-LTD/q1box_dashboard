import React from 'react'
import {GRAPHICS} from './graphics'

export default function ImageLoader({loadingText}) {
  return (
    <div className='t-z-[99999] t-absolute t-m-auto t-top-0 t-left-0 t-w-full t-h-full t-bg-[aliceblue] t-bg-opacity-[0.8]'>
      <div className='t-flex t-justify-center t-items-center t-h-full t-flex-column'>
        <img src={GRAPHICS.QrLogo} alt='Metronic logo' height={100} width={100} />
        <span className='t-text-lg t-mt-4 t-font-semibold'>{loadingText}</span>
      </div>
    </div>
  )
}
