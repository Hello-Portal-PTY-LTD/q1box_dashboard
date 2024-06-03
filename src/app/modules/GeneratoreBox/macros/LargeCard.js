import React from 'react'
import {CARDS} from './utils/mock'

function LargeCards() {
  return (
    <div className='layout-container'>
      <div className='t-grid t-grid-cols-1 t-md:grid-cols-2 t-gap-10 t-justify-items-center t-m-auto t-padding-x t-lg:p-0 t-lg:w-[75%]'>
        {CARDS.map((current, index) => {
          return (
            <div
              key={index}
              className='t-bg-white t-text-center t-flex-column t-justify-center t-space-y-7 t-border-2 t-p-4 t-lg:p-8 t-max-w-[478px] t-rounded-primary t-w-full t-shadow-sm'
            >
              <div className='t-flex-1 t-flex-column t-gap-4 t-lg:gap-10'>
                <p className='t-text-xl t-md:text-2xl t-lg:text-heading t-leading-10 t-font-bold t-text-t2'>
                  {current.title}
                </p>
                <span className='t-text-sm md:t-text-base t-font-[500] t-antialiased t-text-t1'>
                  {current.brief}
                </span>
              </div>
              <img
                src={current.image}
                width={327}
                height={100}
                className={`${index === 1 ? 't-ml-10' : 't-ml-10'} t-w-[80%]`}
                alt='image'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LargeCards
