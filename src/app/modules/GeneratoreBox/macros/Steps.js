import React from 'react'

import CardRound from './cardRound'
import {MarketingCard} from './utils/mock'

function Steps() {
  return (
    <>
      <section className='layout-container t-text-t2 t-space-y-14'>
        <div className='t-padding-x t-mt-[80px] t-flex t-flex-col t-lg:flex-row t-items-center t-lg:items-start t-justify-between t-gap-10 t-xl:gap-[5.4rem] '>
          <div className='t-bg-white t-border-2 t-rounded-3xl t-p-5 t-md:bg-transparent t-md:border-none t-md:p-0 t-flex t-flex-col t-gap-5 t-lg:w-[59%] t-max-w-[478px] t-md:max-w-none'>
            <div className='t-flex t-flex-col t-gap-5 t-xl:w-[85%]'>
              <h2 className='t-heading t-font-bold'>Real-Time Marketing Made Easy</h2>
              <p className='t-breif t-font-medium t-text-t1'>
                When you make a QR code, it gives you the power to update your marketing material in
                real-time. Now, it's so easy to instantly connect with customers and provide them
                with the latest collateral and information about your brand.
              </p>
              <ul className='t-text-t1 t-flex t-flex-col t-gap-1 t-breif'>
                <li>
                  <span className='t-font-bold'>Step 1:</span> Update the document or webpage your
                  QR code links to.
                </li>
                <li>
                  <span className='t-font-bold'>Step 2:</span> Push your changes live.
                </li>
                <li>
                  <span className='t-font-bold'>Step 3:</span> Scan your QR code and see the new
                  content.
                </li>
              </ul>
            </div>
            <img
              src='/assets/images/steps.png'
              width={100}
              height={100}
              className='t-w-full'
              alt='steps'
            />
          </div>
          <div className='t-bg-white t-border-2 t-rounded-3xl t-p-5 t-md:bg-transparent t-md:border-none t-md:p-0 t-flex t-flex-col t-md:flex-row t-lg:flex-col t-items-center t-justify-center t-lg:text-center t-lg:w-[44%] t-gap-5 t-md:gap-10 t-lg:gap-5 t-max-w-[478px] t-md:max-w-none'>
            <img
              src='/assets/images/marketingqr.png'
              width={100}
              height={100}
              className='t-w-full t-md:w-1/2 t-lg:w-[94%]'
              alt='steps'
            />
            <div className='t-flex t-flex-col t-gap-5'>
              <h2 className='t-heading t-font-bold'>Take Customers On a Journey</h2>
              <p className='t-breif t-font-medium t-text-t1'>
                Historically, it's been challenging to get additional marketing material in front of
                leads. Now, rather than a lengthy leaflet or heavy brochure, you can give them easy
                access to digital content via a platform they enjoy. Whether it's copy, images, or
                video, creating a QR code is a highly effective way to steer customers toward
                content that makes them convert.
              </p>
            </div>
          </div>
        </div>
        <div className='t-relative t-px-[20px] t-lg:px-[75px] t-xl:px-[100px]'>
          <div className='t-grid t-grid-cols-1 t-md:grid-cols-2 t-gap-6 t-md:gap-12 t-1320:gap-20'>
            {MarketingCard.map(({title, text}) => (
              <CardRound title={title} text={text} />
            ))}
          </div>
        </div>
        <div className='t-padding-x t-text-center t-flex t-flex-col t-items-center t-gap-5 '>
          <div className='t-md:w-[85%] t-flex t-flex-col t-items-center t-gap-5'>
            <h2 className='t-heading t-font-bold'>
              More Hot Leads, Highly Engaged Prospects & Increased Sales
            </h2>
            <p className='t-breif t-font-medium t-text-t1 t-sm:w-[88%]'>
              The Q1 Box QR code creator empowers you to share engaging content via an imaginative
              user journey. This gives you the foundation to increase brand awareness, drive
              engagement—and most importantly, generate more sales.
            </p>
          </div>
        </div>
      </section>
      <div className='t-relative t-flex t-items-center t-justify-center t-mt-8'>
        <img
          src='/assets/images/rectanglebackground.png'
          width={100}
          height={100}
          className='t-w-full t-hidden t-lg:block'
          alt='white  background'
        />
        <div className='lg:absolute t-padding-x t-text-center t-flex t-flex-col t-gap-3 xl:gap-4 t-mt-6 t-border lg:border-none t-bg-white lg:bg-transparent t-py-12 lg:py-0'>
          <h2 className='t-heading t-font-bold t-text-t2'>Upgrade Your Marketing Strategy</h2>
          <p className='breif t-font-medium t-text-t1 '>
            QR codes bridge the gap between print and digital marketing. Some say print marketing is
            dead. On the contrary, adding a QR code to your printed material gives you the
            opportunity to direct users to additional content, encouraging them to buy into your
            brand.
          </p>
          <span className='breif t-font-bold t-text-t2'>
            Let's refresh your marketing strategy with Q1 Box
          </span>
        </div>
      </div>
    </>
  )
}

export default Steps
