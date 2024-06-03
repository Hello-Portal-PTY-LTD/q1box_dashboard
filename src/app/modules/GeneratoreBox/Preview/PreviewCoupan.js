import React from 'react'

import {useWatch} from 'react-hook-form'
import {GRAPHICS} from '../graphics'

const LineBreak = () => {
  return (
    <div className='t-inline-flex t-w-full'>
      <img src={GRAPHICS.LINE_D} width={18} height={18} alt='line d img' className='t-w-full' />
    </div>
  )
}

function PreviewCoupon() {
  const preview = useWatch({name: 'preview'})
  const couponTime = useWatch({name: 'couponTime'})
  const buttonText = useWatch({name: 'buttonText'})
  const buttonLink = useWatch({name: 'buttonLink'})
  const salePercentage = useWatch({name: 'salePercentage'})
  const couponNo = useWatch({name: 'couponNo'})
  const detail = useWatch({name: 'couponDetails'})

  const textColor = preview?.textColor
  const bgColor = preview?.bgColor
  const buttonColor = preview?.buttonColor
  const percentage = salePercentage || ''
  const coverImage =
    typeof preview?.coverImage === 'string' ? preview?.coverImage : preview?.coverImage?.preview

  const couponTimeHours = couponTime?.hours
  const couponTimeMinutes = couponTime?.minutes
  const couponTimeSeconds = couponTime?.seconds
  const couponDescription = detail || 'Hurry it Up! Coupon Will Expire in 2 days'

  const borderStyle = {
    borderColor: textColor,
    borderWidth: '1px',
    color: textColor,
  }

  return (
    <>
      <div className='t-flex-column t-m-auto lg:max-w-[82%] t-h-full  t-justify-between t-text-white t-w-full t-rounded-[10px]'>
        <div
          style={{
            background: bgColor,
            color: textColor,
          }}
          className=' t-h-full t-rounded-[12px] t-flex-column t-gap-3 t-items-center t-pb-3 t-text-center'
        >
          <img
            width={100}
            height={100}
            src={coverImage || GRAPHICS.COUPEN}
            className='t-w-full t-h-[20vh] t-object-cover t-rounded-t-md t-cursor-pointer'
            alt='video-thumbnail'
          />
          {percentage && (
            <div className='t-bg-t1 t-max-w-[80%] t-break-words t-py-[10px] t-rounded-md t-px-[20px] t-font-bold'>
              <p className='t-text-white'>{percentage}</p>
            </div>
          )}
          <div className='t-flex t-gap-4 t-mt-2'>
            <div className='t-flex t-text-center t-gap-3' style={{color: textColor}}>
              <div className='t-space-y-2'>
                <span
                  style={borderStyle}
                  className='t-text-[20px] t-font-bold t-rounded-full t-p-[8px]'
                >
                  {couponTimeHours}
                </span>
                <p className='t-text-[12px]'>Hours</p>
              </div>
            </div>
            <div className='t-flex t-text-center t-gap-3' style={{color: textColor}}>
              <div className='t-space-y-2'>
                <span
                  style={borderStyle}
                  className='t-text-[20px] t-font-bold t-rounded-full t-p-[8px]'
                >
                  {couponTimeMinutes}
                </span>
                <p className='t-text-[12px]'>Minutes</p>
              </div>
            </div>
            <div className='t-flex t-text-center t-gap-3' style={{color: textColor}}>
              <div className='t-space-y-2'>
                <span
                  style={borderStyle}
                  className='t-text-[20px] t-font-bold t-rounded-full t-p-[8px]'
                >
                  {couponTimeSeconds}
                </span>
                <p className='t-text-[12px]'>Seconds</p>
              </div>
            </div>
          </div>

          <p style={{color: textColor}} className='t-text-sm t-break-words t-w-[80%]'>
            {couponDescription}
          </p>

          <p style={{color: textColor}} className='t-text-sm t-font-medium t-break-words t-w-[80%]'>
            #{couponNo}
          </p>
          <LineBreak />
          <button
            type='button'
            className='t-primary-button t-min-h-[50px]'
            style={{background: buttonColor}}
            onClick={() => {
              window.open(buttonLink)
            }}
          >
            {buttonText || ''}
          </button>
        </div>
      </div>
    </>
  )
}

export default PreviewCoupon
