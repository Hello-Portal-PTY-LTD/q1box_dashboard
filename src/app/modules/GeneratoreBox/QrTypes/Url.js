import React from 'react'
import Input from '../macros/Input'

function Url() {
  return (
    <div className='t-flex-column t-gap-2'>
      <Input
        placeholder='(https://www.google.com)'
        inputLabel='Enter URL'
        classNames='t-h-[45px]'
        name='url'
      />
    </div>
  )
}

export default Url
