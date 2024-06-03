import React, {useContext, useState} from 'react'

import {QR_STYLE} from '../utils/mock'
import {ToggleIcons} from './toggleIcon'
import {ARROW_ICONS as icons} from '../utils/mock'
import {useFormContext} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {setDecorateModal, setModalTab} from 'store/barCode/barCodeSlice'

function QrStyle() {
  const {setValue} = useFormContext()
  const [isOpen, setIsOpen] = useState(true)
  const [iconIndex, setIconIndex] = useState(0)
  const dispatch = useDispatch()

  const handleSelect = (type) => {
    setValue('qrStyle', type)
    if (type === 'logo') {
      // dispatch(setDecorateModal(true))
    }
    dispatch(setModalTab('UPLOAD LOGO'))
  }

  return (
    <div
      className='t-flex-column  t-p-4
    t-bg-light t-border t-border-grey t-rounded-[5px] t-w-full t-gap-4'
    >
      <div className='t-row-flex t-justify-between'>
        <p className='t-font-semibold'>QR style</p>
        <ToggleIcons
          {...{
            isOpen,
            setIconIndex,
            setIsOpen,
            height: 6,
            width: 11,
            icons,
            iconIndex,
          }}
        />
      </div>
      <div className='t-row-flex t-gap-5'>
        {isOpen &&
          QR_STYLE.map(({image, title, type}, key) => (
            <span
              key={key}
              className='t-text-center t-space-y-2'
              onClick={() => handleSelect(type)}
            >
              <img src={image} width={64} height={64} className='t-cursor-pointer' alt='qr-code' />
              <p className='t-text-sm  t-text-t2'>{title}</p>
            </span>
          ))}
      </div>
    </div>
  )
}

export default QrStyle
