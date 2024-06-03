import React from 'react'
import classNames from 'classnames'

function CardQrImage({image, title}) {
  const cardClass = classNames(
    't-flex-column t-text-center t-rounded-[20px] t-shadow-secondary t-w-full t-items-center t-max-w-[270px]'
  )

  return (
    <div className={cardClass}>
      <p className='t-text-sm t-w-full t-rounded-t-[20px] t-p-5 t-lg:text-base t-bg-secondary t-text-black'>
        {title}
      </p>
      <img src={image} width={180} height={180} className='t-p-[31px]' alt='qr' />
    </div>
  )
}

export default CardQrImage
