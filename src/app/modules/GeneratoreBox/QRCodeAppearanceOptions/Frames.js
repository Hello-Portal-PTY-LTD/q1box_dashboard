import { COLOR_PALLETES_FRAMES, QR_FRAMES } from '../../GeneratoreBox/utils/mock'

import { setQrFrame, setQrFrameText, setQrTemplate } from 'store/barCode/barCodeSlice'
import { useDispatch } from 'react-redux'
import InputColorWithContext from '../macros/InputColorWithContext'

import { setQrFrameColor, setQrTextColor } from 'store/barCode/barCodeSlice'

import ColorPallete2 from '../ColorPalette2'
import { useState } from 'react'

function Frames() {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('')
  const handleQrFrame = (type) => {
    if (type === 'none') {
      dispatch(setQrFrame(''))
      dispatch(setQrTemplate('plain'))
    }
    if (type === 'frameBoldText') {
      dispatch(setQrFrameColor('#17B556'))
      dispatch(setQrTextColor('#000000'))

      dispatch(setQrFrame(type))
    } else if (type === 'frameSimple') {
      dispatch(setQrFrameColor('#ff5161'))
      dispatch(setQrTextColor('#ffffff'))
      dispatch(setQrFrame(type))
    } else if (type === 'frameRibbon') {
      dispatch(setQrFrameColor('#ff5161'))
      dispatch(setQrTextColor('#ffffff'))
      dispatch(setQrFrame(type))
    } else if (type === 'roundedFrame') {
      dispatch(setQrFrameColor('#17B556'))
      dispatch(setQrFrame(type))
    }
  }

  const handleBtnTextChange = (e) => {
    dispatch(setQrFrameText(e.target.value))
  }

  const handlePalletChange = (selectedPallets) => {
    dispatch(setQrFrameColor(selectedPallets.iconsColor))
    dispatch(setQrTextColor(selectedPallets.textColor))
  }

  return (
    <>
      <div className='t-text-lg t-font-[500] t-px-4 lg:t-px-0 t-flex-column t-gap-5'>
        <div className='t-flex t-gap-4'>
          {QR_FRAMES.map((item, index) => {
            return (
              <div
                className='t-cursor-pointer t-min-w-[50px]'
                key={index}
                onClick={() => {
                  setSelected(item.type)
                  handleQrFrame(item.type)
                }}
              >
                <img
                  src={item.image}
                  key={index}
                  className={`${selected === item.type && 't-border-2 t-border-primary t-p-2 t-rounded-md'
                    }  ${item.type === 'frameRibbon'
                      ? 't-h-[100px] t-w-[100px] t-object-contain'
                      : ' t-h-[90px] t-w-[90px] t-object-contain'
                    }`}
                  alt='Imagess'
                  width={100}
                />
              </div>
            )
          })}
        </div>
        <div className='xl:t-w-[40%] t-flex-column t-gap-2 t-text-base'>
          <label>Button Text</label>
          {/* <Input placeholder="Scan Me" name="qrFrameButtonText" /> */}
          <input
            maxLength={8}
            placeholder='Scan Me'
            defaultValue='Scan Me'
            className='t-input'
            onChange={handleBtnTextChange}
          />
        </div>
        <div className='xl:t-w-[85%] t-flex-column t-gap-2'>
          <p className='t-font-medium t-text-base'>Change QR Style</p>
          <div className='t-input-color-wrapper'>
            <InputColorWithContext name='qrFrameColor' inputLabel='Frame Color' />
            {/* <InputColorWithContext name='fgColor' inputLabel='QR color' /> */}
            <InputColorWithContext name='qrTextColor' inputLabel='Text color' />
          </div>
        </div>
        <div className='t-flex-column gap-2'>
          <p className='t-text-base lg:t-text-lg t-font-medium'>Pattern</p>
          <div className='lg:t-mr-5'>
            <ColorPallete2
              pallete={COLOR_PALLETES_FRAMES}
              palleteClass='t-color-palette-grid'
              onChange={handlePalletChange}
              crossIcon={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Frames
