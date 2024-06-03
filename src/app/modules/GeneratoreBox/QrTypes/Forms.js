import React from 'react'
import Input from '../macros/Input'

const Forms = () => {
  return (
    <div className='t-flex-column t-gap-5'>
      <div className='t-flex-column t-gap-5'>
        <Input inputLabel='Form URL' name='url' placeholder='https://forms.google.com' />
      </div>
    </div>
  )
}

export default Forms
