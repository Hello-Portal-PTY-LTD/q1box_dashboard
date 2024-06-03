import React from 'react'
import {QR} from './utils/mock'
import CardQrImage from './macros/CardQrImage'
import classNames from 'classnames'

export default function QrCards() {
  const wrapperClass = classNames('layout-container t-font-bold t-text-center t-space-y-14')

  const sectionClass = classNames(
    't-padding-x t-m-auto t-grid t-grid-cols-1 t-sm:grid-cols-3 t-justify-items-center t-gap-y-6 t-sm:gap-5 t-max-w-[90%]'
  )

  return (
    <div className='t-space-y-10'>
      <article className='t-flex-column t-w-full t-lg:max-w-[50%] t-m-auto t-leading-6 t-gap-3 t-md:gap-[30px] t-text-center'>
        <p className='t-text-xl t-md:text-heading t-font-bold t-text-t2'>
          White Label & Bring Your Brand
        </p>
        <p className='t-text-sm t-font-medium t-w-full t-xl:w-[65%] t-1320:w-[46%] t-m-auto t-text-t1 t-md:text-base'>
          Customise the design of your QR codes with a company logo, colours, shapes and more.
        </p>
      </article>
      <div className={wrapperClass}>
        <section className={sectionClass}>
          {QR.map((current, index) => (
            <CardQrImage {...current} key={index} />
          ))}
        </section>
      </div>
    </div>
  )
}
