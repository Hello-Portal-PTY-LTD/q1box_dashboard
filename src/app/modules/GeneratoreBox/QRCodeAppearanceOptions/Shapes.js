import React, {useState} from 'react'
import {QR_SHAPES} from '../../GeneratoreBox/utils/mock'
import {
  setPattern,
  setEyeBall,
  setEyeFrame,
  setOuterEyeRadius,
  setInnerEyeRadius,
} from 'store/barCode/barCodeSlice'

import {useDispatch} from 'react-redux'

function Shapes() {
  const dispatch = useDispatch()

  const [selected, setSelected] = useState({mode: '', type: ''})
  const handleFrameClick = (frame, type, value) => {
    if (type === 'pattren') {
      dispatch(setPattern(frame))
    }
    if (type === 'eye-frame') {
      dispatch(setEyeFrame(frame))
      dispatch(setOuterEyeRadius(value))
    }
    if (type === 'eye-ball') {
      dispatch(setEyeBall(frame))
      dispatch(setInnerEyeRadius(value))
    }
  }

  return (
    <>
      <div className='t-text-lg t-font-[500] t-px-3 t-lg:px-0 t-flex-column t-gap-5'>
        {QR_SHAPES.map(({childrens, name, type}, index) => (
          <div key={index} className='t-flex-column t-gap-2'>
            <p className='t-text-sm lg:t-text-base t-font-semibold'>{name}</p>
            <div className='t-flex t-flex-wrap t-lg:grid t-lg:grid-cols-10 t-gap-2 md:t-gap-4'>
              {childrens.map(({image, mode, value}, childIndex) => (
                <div
                  onClick={() => {
                    setSelected({mode, type})
                    handleFrameClick(mode, type, value)
                  }}
                  className={`${
                    selected.mode === mode &&
                    selected.type === type &&
                    't-border-2 t-border-primary t-p-2 t-rounded-md'
                  } t-border t-rounded-md t-w-[40px] t-h-[40px] t-cursor-pointer t-flex t-justify-center  t-items-center t-col-span-1 t-row-span-1`}
                >
                  <img
                    key={childIndex}
                    src={image}
                    width={100}
                    height={100}
                    className='t-w-[30px] t-h-[30px]'
                    alt='img'
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Shapes
