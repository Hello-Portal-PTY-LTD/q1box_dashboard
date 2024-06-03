import React from 'react'
import Textarea from '../macros/TextArea'

const ShowText = () => {
  return (
    <div className='t-flex-column t-gap-5'>
      <div className='t-flex-column t-gap-5 '>
        <p className='t-font-medium'>Text</p>
        <Textarea name='text' placeholder='Please write some text to generate QR' />
      </div>
    </div>
  )
}

export default ShowText
