import React from 'react'

function Media() {
  return (
    <section className='layout-container t-text-t2 t-space-y-14'>
      <div className='t-padding-x t-space-y-8 t-lg:space-y-16 t-mt-[80px] t-xl:mt-[102px]'>
        <section className='t-text-center t-flex-column t-space-y-5 t-lg:space-y-16'>
          <p className='t-text-xl t-md:text-heading t-font-bold'>
            Up Your Digital & Printed Marketing Game
          </p>
          <p className='t-text-sm t-md:text-base'>
            Use Q1 Box code generator to enhance digital marketing campaigns, or add them to printed
            materials to boost engagement and guide customers on a carefully planned user journey.
          </p>
        </section>
        <img
          src='/assets/images/media_tiles.png'
          width={100}
          height={100}
          className='t-w-full'
          alt='image'
        />
      </div>
      <div className='t-relative'>
        <div className='t-absolute t-flex-column 500:gap-1 t-top-[25%] t-lg:gap-3 t-text-white t-left-0 t-right-0 t-xl:gap-10 t-text-center t-mx-auto'>
          <p className='t-text-[10px] 500:text-sm t-md:text-xl t-lg:text-2xl t-xl:text-[32px] t-font-bold'>
            {' '}
            Let's get started
          </p>
          <p className='t-text-[8px] t-antialiased 500:text-[10px] t-md:text-sm t-lg:text-base t-font-[500]'>
            Transform your marketing efforts and start using Q1 Box today.
          </p>
        </div>
        <img
          src='/graphics/svgs/bar.svg'
          width={20}
          height={20}
          className='t-w-[90%] t-m-auto'
          alt='image'
        />
      </div>
    </section>
  )
}

export default Media
