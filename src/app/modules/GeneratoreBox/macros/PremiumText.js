import React from 'react'
import {GRAPHICS} from '../graphics'

function PremiumText({text}) {
  return (
    <div className='t-flex t-gap-[10px]'>
      <p className='t-text-base md:t-text-lg t-font-[500]'>{text}</p>
      <img src={GRAPHICS.CROWN} alt='premium' width={20} height={20} />
    </div>
  )
}

export default PremiumText
