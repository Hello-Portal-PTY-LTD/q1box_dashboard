import React from 'react'
import Input from '../macros/Input'
import Textarea from '../macros/TextArea'

const SendEmail = () => {
  return (
    <div className='t-flex-column t-gap-7'>
      <div className='t-flex-column t-gap-3'>
        <Input name='email' placeholder='Enter Email' inputLabel='Email ID:' />
        <Input name='subject' placeholder='Enter Email' inputLabel='Subject:' />
        <Textarea name='message' placeholder='Your Message' inputLabel='Message' />
      </div>
    </div>
  )
}

export default SendEmail
