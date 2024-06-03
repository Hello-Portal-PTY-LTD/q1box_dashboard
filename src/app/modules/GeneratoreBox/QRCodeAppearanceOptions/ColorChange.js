import {COLOR_PALLETES_QR} from '../../GeneratoreBox/utils/mock'
import ColorPallete from '../ColorPallete'
import React from 'react'
import InputColorWithContext from '../macros/InputColorWithContext'
import {setEyeBallColor, setEyeFrameColor, setBgColor, setFgColor} from 'store/barCode/barCodeSlice'
import {useDispatch, useSelector} from 'react-redux'

function ColorChange() {
  const {barCode} = useSelector((state) => state)
  const dispatch = useDispatch()
  const handleColorSelect = (selectedPallets, index) => {
    dispatch(setFgColor(selectedPallets[0].color))
    dispatch(setBgColor(selectedPallets[1].color))
    dispatch(setEyeBallColor(selectedPallets[2].color))
    dispatch(setEyeFrameColor(selectedPallets[3].color))
  }
  return (
    <div className='t-text-lg t-font-[500] antialiased t-px-3 t-lg:px-0'>
      <p className='t-text-sm lg:t-text-base'>Pattern</p>
      <div className='flex-column t-gap-4'>
        <ColorPallete
          pallete={COLOR_PALLETES_QR}
          palleteClass='t-flex t-flex-wrap t-gap-2 t-lg:color-palette-grid t-xl:grid-cols-4'
          type='qr'
          onChange={handleColorSelect}
          crossIcon={false}
        />
        <p className='t-text-sm lg:text-base'>Change QR style</p>
        <div className='t-input-color-wrapper'>
          <InputColorWithContext
            name='bgColor'
            inputLabel='BackGround Color'
            defaultValue={barCode.bgColor}
          />
          <InputColorWithContext
            inputLabel='ForeGround Color'
            name='fgColor'
            defaultValue={barCode.fgColor}
          />
          <InputColorWithContext
            name='qrEyeBallColor'
            inputLabel='Eye ball Color'
            defaultValue={barCode.qrEyeBallColor}
          />
          <InputColorWithContext
            inputLabel='Eye pattern color'
            name='qrEyeFrameColor'
            defaultValue={barCode.qrEyeFrameColor}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorChange
