import React, {useState} from 'react'
import InputColor from './inputColor'
import {ARROW_ICONS as icons} from '../utils/mock'
import {ToggleIcons} from './toggleIcon'
import InputColorWithContext from './InputColorWithContext'

function QrColor() {
  const [isOpen, setIsOpen] = useState(true)
  const [iconIndex, setIconIndex] = useState(0)

  return (
    <div className='flex-column t-w-full t-gap-10 t-items-center'>
      <div
        className='t-w-full 
      t-p-4 t-bg-light 
      t-border t-border-grey 
      flex-column t-gap-3
      t-rounded-[5px]'
      >
        <div className='t-row-flex t-justify-between'>
          <p className='t-font-semibold'>Color</p>
          <ToggleIcons
            {...{
              isOpen,
              setIconIndex,
              setIsOpen,
              icons,
              iconIndex,
              height: 6,
              width: 11,
            }}
          />
        </div>
        {isOpen && (
          <div className='flex-column t-gap-4'>
            <div className='t-row-flex t-gap-3  1320:t-gap-4 md:flex-column lg:t-row-flex'>
              <InputColorWithContext
                defaultValue='#000000'
                name='fgColor'
                inputLabel='Foreground'
              />
              <InputColorWithContext
                defaultValue='#ffffff'
                name='bgColor'
                inputLabel='Background'
              />
            </div>
            <div className='t-row-flex t-gap-3 1320:t-gap-4 md:flex-column lg:t-row-flex'>
              <InputColorWithContext
                defaultValue='#ffffff'
                name='qrEyeFrameColor'
                inputLabel='Eye Frame Color'
              />
              <InputColorWithContext
                defaultValue='#ffffff'
                name='qrEyeBallColor'
                inputLabel='Eye Ball Color'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QrColor
