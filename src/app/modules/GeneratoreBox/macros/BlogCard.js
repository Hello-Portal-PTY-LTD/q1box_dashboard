import React from 'react'

import Button from './Button'
import {useNavigate} from 'react-router-dom'

const BlogCard = ({image, Date, Title, Description}) => {
  const router = useNavigate()

  return (
    <div className='t-bg-white t-rounded-3xl t-shadow-sm t-border t-p-5'>
      <div className='flex-column t-gap-3 t-items-'>
        <img src={image} width={100} height={100} alt='card_image' className='t-w-full t-mb-6' />

        <p className='t-text-t2 t-antialiased'>{Date}</p>
        <div className='t-flex t-items-center t-justify-between'>
          <h4 className='t-text-[24px] t-font-medium'>{Title}</h4>
          <img
            src='/graphics/svgs/arrow-top-right.svg'
            width={10}
            height={10}
            alt='Next_icon'
            className='t-cursor-pointer'
          />
        </div>
        <p className='t-text-t2 t-antialiased'>{Description}</p>
        <div className='t-self-start t-w-[35%]' onClick={() => router.push('/blog/ReadBlog')}>
          <Button type='fill' text='Read' />
        </div>
      </div>
    </div>
  )
}

export default BlogCard
