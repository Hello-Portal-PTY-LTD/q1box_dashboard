import React from 'react'

import {useFormContext, useWatch} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {GRAPHICS} from '../graphics'

function PreviewMenu(props) {
  const products = useWatch({name: 'products'})

  const {control} = useFormContext()
  const {shopName, description, preview, menuName, storeLink, buttonName} = useWatch(control, {
    name: [
      'shopName',
      'description',
      'coverImage',
      'preview',
      'menuName',
      'storeLink',
      'buttonName',
    ],
  })

  const state = useSelector((state) => state.barCode)

  const textColor = preview?.textColor
  const bgColor = preview?.bgColor
  const borderColor = preview?.borderColor
  const buttonColor = preview?.buttonColor
  const has = products.some((item) => item.name?.length > 0 || item?.price?.length > 0)
  const menuWrapper = `t-rounded-md t-grid t-gap-x-4 t-gap-y-14 t-mt-[50px] t-place-items-center ${
    products.length > 0 && has && products.length === 1
      ? 't-grid-cols-1'
      : products.length > 0 && products.length > 1
      ? 't-grid-cols-2'
      : products.length === 0
      ? 't-grid-cols-2'
      : 't-grid-cols-2'
  }`

  const handleOpenStore = () => {
    if (storeLink) {
      window.location.href = storeLink
    }
  }

  return (
    <div className='lg:t-mt-3 t-break-words t-rounded-[10px]'>
      <div
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: '7px',
        }}
        className='t-min-h-[500px] t-relative t-pb-[100px] t-rounded-[5px] t-h-full t-rounded-t-[10px] t-items-center t-flex-column'
      >
        <div className='t-w-full t-relative'>
          <img
            src={state?.coverImage?.preview || state?.coverImage?.url || GRAPHICS.RESTAURENT}
            width={100}
            height={100}
            className='t-w-full t-max-h-[150px] t-object-fill t-rounded-t-[5px]'
            alt='restaurant'
          />
          <div className='t-absolute t-bottom-0 t-bg-[rgba(0,0,0,0.4)] t-w-full t-p-4'>
            <p className='t-text-white'>{shopName || 'Shop Name'}</p>
          </div>
        </div>
        <div className='t-flex-column t-gap-3 t-p-2 '>
          <p
            className='t-text-center t-break-all t-px-2 t-text-xl t-font-[500] t-mt-3'
            style={{color: textColor}}
          >
            {menuName || 'Menu'}
          </p>
          <p className='t-break-all t-text-center'>
            {description || 'Presented with impeccable service in a captivating ambiance'}
          </p>
        </div>
        <div className={menuWrapper}>
          {has && products.length > 0
            ? products?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{background: item?.bgColor}}
                    className='t-relative t-rounded-[5px] t-shadow-sm t-bg-white t-p-2 t-h-[105px] t-min-w-[125px] t-text-ellipsis t-max-w-[125px] t-flex t-items-center t-justify-center'
                  >
                    <div className='t-mt-4 t-text-center t-text-ellipsis t-justify-between flex-column'>
                      <p style={{color: item?.textColor}}>
                        {item?.name
                          ? item?.name?.substring(0, 12) + (item?.name?.length >= 15 ? '...' : '')
                          : ''}
                      </p>
                      <p style={{color: item?.textColor}} className='t-text-ellipsis t-font-bold'>
                        {item?.price}$
                      </p>
                    </div>

                    <img
                      src={item?.image?.preview || item?.image || GRAPHICS.FOOD}
                      width={57}
                      height={57}
                      alt='food'
                      style={{
                        maxWidth: '57px',
                        maxHeight: '57px',
                      }}
                      className='t-absolute t-rounded-full t-min-w-[57px] t-min-h-[57px] t-top-[-37px] t-left-0 t-right-0 t-m-auto '
                    />
                  </div>
                )
              })
            : [1, 2, 3, 4].map((_, index) => {
                return (
                  <div
                    key={index}
                    className='t-relative t-rounded-[5px] t-shadow-main t-bg-white t-p-2 t-h-[105px] t-min-w-[125px] t-text-ellipsis t-max-w-[125px] t-flex t-items-center t-justify-center'
                  >
                    <div className='t-mt-4 t-text-center t-text-ellipsis t-justify-between flex-column'>
                      <p>Pizza</p>
                      <p className='t-text-ellipsis t-font-bold'>20$</p>
                    </div>

                    <img
                      src={GRAPHICS.FOOD}
                      width={57}
                      height={57}
                      alt='food'
                      style={{
                        maxWidth: '57px',
                        maxHeight: '57px',
                      }}
                      className='t-absolute t-rounded-full t-top-[-37px] t-left-0 t-right-0 t-m-auto'
                    />
                  </div>
                )
              })}
        </div>
        <div
          className='t-primary-button t-font-medium t-text-lg t-cursor-pointer t-text-center t-w-[90%] t-absolute t-bottom-2 '
          style={{
            background: buttonColor,
          }}
          onClick={handleOpenStore}
        >
          {buttonName && buttonName?.length > 20
            ? `${buttonName?.slice(0, 20)}...`
            : buttonName || 'Visit Us'}
        </div>
      </div>
    </div>
  )
}

export default PreviewMenu
